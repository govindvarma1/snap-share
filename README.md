# SnapShare

SnapShare is a file-sharing web application designed to create rooms for seamless file uploads and sharing. This project incorporates a countdown timer for each room, ensuring the rooms expire after a specific period. Expired rooms, along with their files, are automatically deleted through cron jobs that run every 10 minutes.


## Features

### Core Features:

- **Room Creation**: Users can create a room with a unique code for uploading files.
- **File Upload**: Leverages [UploadThing](https://uploadthing.com/) for secure file uploads.
- **Room Timer**: Displays a countdown for room expiration.
- **Automatic Cleanup**: Deletes expired rooms and associated files periodically using cron jobs.

### Technology Stack:

- **Frontend**: Next.js, TailwindCSS, TypeScript.
- **Backend**: Next.js (API routes), Prisma for database operations.
- **Database**: PostgreSQL.
- **File Uploads**: UploadThing.
- **Scheduler**: cron-jobs for automated tasks.


## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/govindvarma1/snap-share.git
   cd snap-share
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL=<your_postgresql_database_url>
   UPLOADTHING_SECRET=<your_uploadthing_secret>
   UPLOADTHING_PUBLIC=<your_uploadthing_public_key>
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Run the cron job script (optional for local development):

   ```bash
   npm run cron
   ```

## Automated Room Cleanup

### How it Works:

- A **cron job** runs every 10 minutes to delete rooms that have expired (older than 15 minutes).
- The cleanup process also removes files associated with these rooms from UploadThing.

### Key Code Snippet:

#### Cleanup API:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { utapi } from "@/utils/uploadthingClient";

export async function GET() {
    try {
        const now = new Date();
        const threshold = new Date(now.getTime() - 15 * 60 * 1000);

        const expiredRooms = await prisma.room.findMany({
            where: {
                createdAt: { lt: threshold },
            },
            select: {
                id: true,
                files: { select: { mediaId: true } },
            },
        });

        const fileIds = expiredRooms.flatMap((room) => room.files.map((file) => file.mediaId));

        await utapi.deleteFiles(fileIds);

        const deletedRooms = await prisma.room.deleteMany({
            where: {
                createdAt: { lt: threshold },
            },
        });

        console.log(`Deleted ${deletedRooms.count} expired rooms and associated files.`);
        return NextResponse.json(
            { msg: `Deleted ${deletedRooms.count} expired rooms and files`, success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting expired rooms:", error);
        return NextResponse.json(
            { error: (error as Error).message, success: false },
            { status: 500 }
        );
    }
}
```


## Usage

1. Create a room and share the room code with others.
2. Upload files to the room.
3. The files and the room will expire and get deleted after 15 minutes.

---

## License

This project is licensed under the [MIT License](LICENSE).


## Acknowledgments

- [UploadThing](https://uploadthing.com/) for the robust file-upload API.
- TailwindCSS for its seamless styling experience.
- Prisma for easy database management.
- cron-jobs for task scheduling.

Feel free to contribute to the project by opening issues and submitting pull requests!

