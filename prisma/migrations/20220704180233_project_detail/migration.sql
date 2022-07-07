-- CreateTable
CREATE TABLE "ProjectDetails" (
    "id" TEXT NOT NULL,
    "project_slug" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "comments" TEXT[],

    CONSTRAINT "ProjectDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "project_detail_id" TEXT NOT NULL,
    "likes" TEXT[],

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatsView" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "date" TEXT,
    "metricsId" INTEGER NOT NULL,

    CONSTRAINT "StatsView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stats_project_detail_id_key" ON "Stats"("project_detail_id");

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_project_detail_id_fkey" FOREIGN KEY ("project_detail_id") REFERENCES "ProjectDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatsView" ADD CONSTRAINT "StatsView_metricsId_fkey" FOREIGN KEY ("metricsId") REFERENCES "Stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
