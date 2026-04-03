const API_BASE_URL = "http://127.0.0.1:5000";

let activeFilter = null;
let atrasosChartInstance = null;
let statusChartInstance = null;
let custosChartInstance = null;

async function fetchData(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
}

function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


function createAtrasosChart(data) {
    const ctx = document.getElementById("chartAtrasos");

    const rootStyles = getComputedStyle(document.documentElement);
    const accent1 = rootStyles.getPropertyValue("--accent-1").trim();
    const accent2 = rootStyles.getPropertyValue("--accent-2").trim();
    const accent3 = rootStyles.getPropertyValue("--accent-3").trim();
    const textSoft = rootStyles.getPropertyValue("--text-soft").trim();
    const textMain = rootStyles.getPropertyValue("--text-main").trim();

    return new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.map(item => item.fornecedor),
            datasets: [
                {
                    label: "Total de atrasos",
                    data: data.map(item => item.total_atrasos),
                    backgroundColor: data.map(item => {
                        if (item.total_atrasos >= 3) return accent3;
                        if (item.total_atrasos === 2) return accent2;
                        return accent1;
                    }),
                    hoverBackgroundColor: data.map(item => {
                        if (item.total_atrasos >= 3) return accent3;
                        if (item.total_atrasos === 2) return accent2;
                        return accent1;
                    }),
                    borderRadius: 10,
                    borderSkipped: false,
                    barThickness: 42,
                    hoverBackgroundColor: [accent2, accent1, accent3]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1200,
                easing: "easeOutQuart"
            },
            plugins: {
                legend: {
                    labels: {
                        color: textSoft,
                        boxWidth: 14,
                        boxHeight: 14,
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 18
                    }
                },
                tooltip: {
                    backgroundColor: "rgba(20, 10, 30, 0.95)",
                    titleColor: textMain,
                    bodyColor: textSoft,
                    borderColor: "rgba(255,255,255,0.08)",
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 10,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textSoft,
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textSoft,
                        stepSize: 1,
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: "rgba(255,255,255,0.06)",
                        drawBorder: false
                    },
                    border: {
                        display: false
                    }
                }
            }
        }
    });
}

function createStatusChart(data) {
    const ctx = document.getElementById("chartStatus");

    const rootStyles = getComputedStyle(document.documentElement);
    const accent1 = rootStyles.getPropertyValue("--accent-1").trim();
    const accent2 = rootStyles.getPropertyValue("--accent-2").trim();
    const textSoft = rootStyles.getPropertyValue("--text-soft").trim();
    const textMain = rootStyles.getPropertyValue("--text-main").trim();

    return new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: data.map(item => item.status_entrega),
            datasets: [
                {
                    data: data.map(item => item.total),
                    backgroundColor: [accent2, accent1],
                    borderWidth: 0
                }
            ]
        },
        options: {
            cutout: "72%",
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: textSoft
                    }
                }
            }
        }
    });
}


function createCustosChart(data) {
    const ctx = document.getElementById("chartCustos");

    const rootStyles = getComputedStyle(document.documentElement);
    const accent2 = rootStyles.getPropertyValue("--accent-2").trim();
    const accent1 = rootStyles.getPropertyValue("--accent-1").trim();
    const textSoft = rootStyles.getPropertyValue("--text-soft").trim();
    const textMain = rootStyles.getPropertyValue("--text-main").trim();

    return new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.map(item => item.nome_obra),
            datasets: [
                {
                    label: "Custo total",
                    data: data.map(item => item.custo_total),
                    backgroundColor: accent2,
                    borderRadius: 10,
                    borderSkipped: false,
                    barThickness: 40,
                    hoverBackgroundColor: accent1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1200,
                easing: "easeOutQuart"
            },
            plugins: {
                legend: {
                    labels: {
                        color: textSoft
                    }
                },
                tooltip: {
                    backgroundColor: "rgba(20, 10, 30, 0.95)",
                    titleColor: textMain,
                    bodyColor: textSoft,
                    borderColor: "rgba(255,255,255,0.08)",
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 10
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textSoft
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        color: textSoft
                    },
                    grid: {
                        color: "rgba(255,255,255,0.05)"
                    }
                }
            }
        }
    });
}

function animateValue(elementId, finalValue, duration = 1200, isCurrency = false) {
    const element = document.getElementById(elementId);
    const startTime = performance.now();

    function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = finalValue * easedProgress;

        if (isCurrency) {
            element.textContent = currentValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });
        } else {
            element.textContent = Math.floor(currentValue);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = isCurrency
                ? finalValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })
                : finalValue;
        }
    }

    requestAnimationFrame(update);
}


function destroyCharts() {
    if (atrasosChartInstance) {
        atrasosChartInstance.destroy();
        atrasosChartInstance = null;
    }

    if (statusChartInstance) {
        statusChartInstance.destroy();
        statusChartInstance = null;
    }

    if (custosChartInstance) {
        custosChartInstance.destroy();
        custosChartInstance = null;
    }
}


async function loadDashboard() {
    try {
        destroyCharts();

        const atrasos = await fetchData("/kpi/atrasos");
        const custos = await fetchData("/kpi/custos");
        const status = await fetchData("/kpi/status");

        let filteredStatus = status;

        if (activeFilter === "atrasos") {
            filteredStatus = status.filter(item => item.status_entrega === "Atrasada");
        }

        if (activeFilter === "status") {
            filteredStatus = status;
        }

        atrasosChartInstance = createAtrasosChart(atrasos);
        statusChartInstance = createStatusChart(filteredStatus);
        custosChartInstance = createCustosChart(custos);

        const totalAtrasos = atrasos.reduce((acc, item) => acc + item.total_atrasos, 0);
        const totalObras = custos.length;
        const custoTotal = custos.reduce((acc, item) => acc + item.custo_total, 0);
        const totalFornecedores = atrasos.length;

        const entregasAtrasadas = status.find(item => item.status_entrega === "Atrasada")?.total || 0;
        const entregasNoPrazo = status.find(item => item.status_entrega === "No Prazo")?.total || 0;

        animateValue("total-atrasos", totalAtrasos);
        animateValue("total-obras", totalObras);
        animateValue("custo-total", custoTotal, 1400, true);
        animateValue("total-fornecedores", totalFornecedores);

        animateValue("resumo-atrasadas", entregasAtrasadas);
        animateValue("resumo-prazo", entregasNoPrazo);
        animateValue("resumo-obras", totalObras);
        animateValue("resumo-fornecedores", totalFornecedores);
    } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
    }
}

async function updateDashboard(filter = null) {
    activeFilter = filter;

    // por enquanto só recarrega tudo
    await loadDashboard();
}

document.querySelectorAll(".panel").forEach(panel => {
    panel.addEventListener("mousemove", e => {
        const rect = panel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        panel.style.setProperty("--mouse-x", `${x}px`);
        panel.style.setProperty("--mouse-y", `${y}px`);
    });
});

document.querySelectorAll(".mini-card").forEach(card => {
    card.addEventListener("click", () => {
        const filter = card.dataset.filter;

        document.querySelectorAll(".mini-card").forEach(item => {
            item.classList.remove("active");
        });

        card.classList.add("active");

        console.log("Filtro clicado:", filter);

        updateDashboard(filter);
    });
});

loadDashboard();

