import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { parseHTML } from "linkedom";
import { uniq } from "lodash";

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams.get("query");

  return axios
    .get(
      `https://www.musicmagpie.co.uk/api/elasticSearch/getProductsAutocompleteDropdown?searchString=${query}`,
      {
        responseType: "text",
      }
    )
    .then(({ data: html }: AxiosResponse) => {
      try {
        const dom = parseHTML(html);
        const matches = uniq(
          Array.from(
            dom.document.querySelectorAll(".autocomplete-list-link-title")
          ).map((item) =>
            item.textContent
              ?.trim()
              .replace(/\([^\)]+\)/, "")
              .trim()
          )
        );
        return NextResponse.json({ devices: matches });
      } catch (e) {
        console.error(e);
        return NextResponse.json([]);
      }
    });
};
