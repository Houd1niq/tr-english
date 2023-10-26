-- CreateTable
CREATE TABLE "knowledge-base" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "knowledge-base_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge-base-item" (
    "itemId" SERIAL NOT NULL,
    "correctCounter" INTEGER NOT NULL DEFAULT 0,
    "wrongCounter" INTEGER NOT NULL DEFAULT 0,
    "rusWord" TEXT NOT NULL,
    "engWord" TEXT NOT NULL,
    "knowledgeBaseId" INTEGER NOT NULL,

    CONSTRAINT "knowledge-base-item_pkey" PRIMARY KEY ("itemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "knowledge-base_studentId_key" ON "knowledge-base"("studentId");

-- AddForeignKey
ALTER TABLE "knowledge-base" ADD CONSTRAINT "knowledge-base_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge-base-item" ADD CONSTRAINT "knowledge-base-item_knowledgeBaseId_fkey" FOREIGN KEY ("knowledgeBaseId") REFERENCES "knowledge-base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
