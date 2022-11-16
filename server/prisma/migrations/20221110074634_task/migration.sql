-- CreateTable
CREATE TABLE "task" (
    "taskId" SERIAL NOT NULL,
    "value" JSONB[],
    "userId" INTEGER,

    CONSTRAINT "task_pkey" PRIMARY KEY ("taskId")
);

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
