import { dbQuery } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const data = await req.json();
  return dbQuery((prisma) => {
    return prisma.record.create({
      data,
    });
  })
    .then(() => {
      return NextResponse.json({ status: "success" }, { status: 201 });
    })
    .catch((e: Error) => {
      return NextResponse.json(
        { status: "error", message: e.message },
        { status: 400 }
      );
    });
};

export const GET = async (req: NextRequest) => {
  const minLatitude = req.nextUrl.searchParams.get("minLat");
  const maxLatitude = req.nextUrl.searchParams.get("maxLat");
  const minLongitude = req.nextUrl.searchParams.get("minLong");
  const maxLonguitude = req.nextUrl.searchParams.get("maxLong");

  if (!minLatitude || !maxLatitude || !minLongitude || !maxLonguitude) {
    return [];
  }

  return dbQuery((prisma) =>
    prisma.record
      .findMany({
        where: {
          latitude: {
            gte: parseFloat(minLatitude),
            lte: parseFloat(maxLatitude),
          },
          longitude: {
            gte: parseFloat(minLongitude),
            lte: parseFloat(maxLonguitude),
          },
        },
      })
      .then((results) =>
        results.map(
          ({
            latitude: lat,
            longitude: lng,
            speed,
            device,
            network,
            createdAt,
          }) => ({
            lng,
            lat,
            device,
            network,
            speed,
            createdAt,
          })
        )
      )
      .then((markerCoords) =>
        NextResponse.json(
          { status: "success", data: markerCoords },
          { status: 201 }
        )
      )
      .catch((e: Error) =>
        NextResponse.json(
          { status: "error", message: e.message },
          { status: 400 }
        )
      )
  );
};
