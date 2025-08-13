-- CreateTable
CREATE TABLE "udyam_registrations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "aadhaarNumber" TEXT NOT NULL,
    "entrepreneurName" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "panName" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "udyam_registrations_aadhaarNumber_key" ON "udyam_registrations"("aadhaarNumber");

-- CreateIndex
CREATE UNIQUE INDEX "udyam_registrations_panNumber_key" ON "udyam_registrations"("panNumber");
