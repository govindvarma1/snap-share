import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import {z} from "zod";

const uploadThing = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
	allFilesUploader: uploadThing({
		image: { maxFileSize: "4MB", maxFileCount: 40 },
		video: { maxFileSize: "256MB", maxFileCount: 4 },
		audio: { maxFileSize: "64MB", maxFileCount: 10 },
		blob: { maxFileSize: "128MB", maxFileCount: 20 },
	})
		.input(z.object({roomCode: z.number()}))
		.middleware(async ({ req, input }) => {
			const user = auth(req);
			if (!user) throw new UploadThingError("Unauthorized");
			return { userId: user.id, roomId: input.roomCode };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
