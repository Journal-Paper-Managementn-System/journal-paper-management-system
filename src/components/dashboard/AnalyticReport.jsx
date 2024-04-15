import React, { useState } from "react";
import Chart from "react-apexcharts";

function AnalyticReport() {
    const [state, setState] = useState({
        options: {
            colors: ['#E91E63', '#9C27B0'],
            chart: {
                id: "publication-name",
            },
            xaxis: {
                categories: [
                    "publication-1",
                    "publication-2",
                    "publication-3",
                    "publication-4",
                    "publication-5",
                ],
            },
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49],
            },
        ],
    });

    return (
        <section>
            <h5
                className="p-2 pb-0 fw-semibold text-primary">
                Analytical Report
                <hr />
            </h5>
            <div className="row">
                <div className="col-8 overflow-auto">
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="line"
                        width="500"
                    />
                </div>
            </div>
        </section>
    );
}

export default AnalyticReport;
