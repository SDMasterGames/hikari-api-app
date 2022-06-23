-- CreateTable
CREATE TABLE "ProjectDetails" (
    "id" TEXT NOT NULL,
    "project_slug" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "comments" TEXT[],

    CONSTRAINT "ProjectDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metrics" (
    "id" SERIAL NOT NULL,
    "project_detail_id" TEXT NOT NULL,
    "likes" TEXT[],

    CONSTRAINT "Metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricsDataView" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "metricsId" INTEGER,

    CONSTRAINT "MetricsDataView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricsDataClick" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "metricsId" INTEGER,

    CONSTRAINT "MetricsDataClick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Metrics_project_detail_id_key" ON "Metrics"("project_detail_id");

-- AddForeignKey
ALTER TABLE "Metrics" ADD CONSTRAINT "Metrics_project_detail_id_fkey" FOREIGN KEY ("project_detail_id") REFERENCES "ProjectDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricsDataView" ADD CONSTRAINT "MetricsDataView_metricsId_fkey" FOREIGN KEY ("metricsId") REFERENCES "Metrics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricsDataClick" ADD CONSTRAINT "MetricsDataClick_metricsId_fkey" FOREIGN KEY ("metricsId") REFERENCES "Metrics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
