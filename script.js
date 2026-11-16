
// ==========================================
// ДАННЫЕ И СОХРАНЕНИЕ
// ==========================================

const savedCars = JSON.parse(localStorage.getItem("cars")) || [];
const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
const savedServices = JSON.parse(localStorage.getItem("services")) || [];

function saveCars() {
    localStorage.setItem("cars", JSON.stringify(savedCars));
}

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(savedExpenses));
}

function saveServices() {
    localStorage.setItem("services", JSON.stringify(savedServices));
}

function calculateTotalExpenses() {
    return savedExpenses.reduce(function(total, expense) {
        return total + (Number(expense.amount) || 0);
    }, 0);
}

function formatMoney(amount) {
    return Number(amount || 0).toLocaleString("ru-RU") + " ₽";
}

function formatMileage(mileage) {
    return Number(mileage || 0).toLocaleString("ru-RU") + " км";
}

function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}

function formatDate(date) {
    if (!date) return "Не указана";

    return new Date(date + "T00:00:00").toLocaleDateString("ru-RU");
}


// ==========================================
// ЭЛЕМЕНТЫ АВТОМОБИЛЕЙ
// ==========================================

const button = document.getElementById("add-car-btn");
const form = document.getElementById("car-form");
const saveButton = document.getElementById("save-car-btn");
const carsList = document.getElementById("cars-list");


// ==========================================
// ЭЛЕМЕНТЫ РАСХОДОВ
// ==========================================

const addExpenseButton = document.getElementById("add-expense-btn");
const expenseForm = document.getElementById("expense-form");
const saveExpenseButton = document.getElementById("save-expense-btn");

const expenseCar = document.getElementById("expense-car");
const expenseCategory = document.getElementById("expense-category");
const expenseAmount = document.getElementById("expense-amount");
const expenseDate = document.getElementById("expense-date");
const expenseDescription = document.getElementById("expense-description");
const expensesList = document.getElementById("expenses-list");


// ==========================================
// ЭЛЕМЕНТЫ ОБСЛУЖИВАНИЯ
// ==========================================

const addServiceButton = document.getElementById("add-service-btn");
const serviceForm = document.getElementById("service-form");
const saveServiceButton = document.getElementById("save-service-btn");

const serviceCar = document.getElementById("service-car");
const serviceCategory = document.getElementById("service-category");
const serviceDate = document.getElementById("service-date");
const serviceMileage = document.getElementById("service-mileage");
const serviceAmount = document.getElementById("service-amount");
const serviceNextMileage = document.getElementById("service-next-mileage");
const serviceNextDate = document.getElementById("service-next-date");
const serviceDescription = document.getElementById("service-description");

const serviceList = document.getElementById("service-list");
const upcomingServiceList = document.getElementById("upcoming-service-list");


// ==========================================
// КРАТКАЯ ИНФОРМАЦИЯ О ГАРАЖЕ
// ==========================================

function renderDashboardGarage() {
    const garageCount = document.getElementById("dashboard-garage-count");
    const garageList = document.getElementById("dashboard-garage-list");

    if (!garageCount || !garageList) return;

    const count = savedCars.length;

    const word = count % 10 === 1 && count % 100 !== 11
        ? "автомобиль"
        : count % 10 >= 2 && count % 10 <= 4 &&
          (count % 100 < 12 || count % 100 > 14)
            ? "автомобиля"
            : "автомобилей";

    garageCount.textContent = count + " " + word;
    garageList.innerHTML = "";

    if (count === 0) {
        garageList.textContent = "Пока нет добавленных автомобилей.";
        return;
    }

    savedCars.forEach(function(car) {
        const item = document.createElement("div");
        item.className = "dashboard-car-item";

        const name = document.createElement("strong");
        name.textContent = car.brand + " " + car.model;

        const mileage = document.createElement("span");
        mileage.textContent = formatMileage(car.mileage);

        item.appendChild(name);
        item.appendChild(mileage);

        garageList.appendChild(item);
    });
}


// ==========================================
// СОЗДАНИЕ ИКОНКИ КУПЮРЫ
// ==========================================

function createBanknoteIcon() {
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "26");
    svg.setAttribute("height", "26");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.8");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");

    const outer = document.createElementNS(svgNS, "rect");
    outer.setAttribute("x", "2");
    outer.setAttribute("y", "5");
    outer.setAttribute("width", "20");
    outer.setAttribute("height", "14");
    outer.setAttribute("rx", "2");

    const inner = document.createElementNS(svgNS, "path");
    inner.setAttribute(
        "d",
        "M6 8c0 1.1-.9 2-2 2m14-2c0 1.1.9 2 2 2M6 16c0-1.1-.9-2-2-2m14 2c0-1.1.9-2 2-2"
    );

    const center = document.createElementNS(svgNS, "circle");
    center.setAttribute("cx", "12");
    center.setAttribute("cy", "12");
    center.setAttribute("r", "3");

    svg.appendChild(outer);
    svg.appendChild(inner);
    svg.appendChild(center);

    return svg;
}


// ==========================================
// СОЗДАНИЕ ИКОНКИ ГАЕЧНОГО КЛЮЧА
// ==========================================

function createWrenchIcon() {
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "26");
    svg.setAttribute("height", "26");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.8");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute(
        "d",
        "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.1-3.1a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"
    );

    svg.appendChild(path);

    return svg;
}


// ==========================================
// ПОСЛЕДНИЕ СОБЫТИЯ НА ГЛАВНОЙ
// ==========================================

function renderDashboardEvents() {
    const eventsList = document.getElementById("dashboard-events-list");

    if (!eventsList) return;

    eventsList.innerHTML = "";

    const events = [];

    // Добавляем обычные расходы.
    // Расходы, автоматически созданные при обслуживании,
    // отдельно не показываем, чтобы не было дублирования.

    savedExpenses.forEach(function(expense) {
        if (expense.serviceId) return;

        events.push({
            type: "expense",
            date: expense.date || "",
            title: expense.category || "Расход",
            car: expense.car || "Автомобиль не указан",
            description: expense.description || "Без описания",
            amount: Number(expense.amount) || 0
        });
    });

    // Добавляем выполненные работы по обслуживанию.

    savedServices.forEach(function(service) {
        events.push({
            type: "service",
            date: service.date || "",
            title: service.category || "Обслуживание",
            car: service.car || "Автомобиль не указан",
            description: service.description || "Работы выполнены",
            amount: Number(service.amount) || 0
        });
    });

    // Сортируем события по дате.

    events.sort(function(a, b) {
        return b.date.localeCompare(a.date);
    });

    // Если событий нет.

    if (events.length === 0) {
        const empty = document.createElement("div");
        empty.className = "dashboard-event-empty";

        const message = document.createElement("p");
        message.textContent = "Пока событий нет.";

        const hint = document.createElement("span");
        hint.textContent =
            "Здесь будут отображаться последние расходы и выполненные работы по обслуживанию.";

        empty.appendChild(message);
        empty.appendChild(hint);

        eventsList.appendChild(empty);
        return;
    }

    // Показываем последние 6 событий.

    events.slice(0, 6).forEach(function(event) {
        const item = document.createElement("div");
        item.className = "dashboard-event-item";

        const icon = document.createElement("div");
        icon.className = "dashboard-event-icon";

        if (event.type === "expense") {
            // Контурная купюра.

            icon.appendChild(createBanknoteIcon());
            icon.style.color = "var(--event-expense)";
            icon.classList.add("event-expense-icon");
        } else {
            // Контурный гаечный ключ.

            icon.appendChild(createWrenchIcon());
            icon.style.color = "var(--event-service)";
            icon.classList.add("event-service-icon");
        }

        const info = document.createElement("div");
        info.className = "dashboard-event-info";

        const title = document.createElement("strong");
        title.textContent = event.title;

        const car = document.createElement("span");
        car.textContent = event.car;

        const description = document.createElement("small");
        description.textContent = event.description;

        const date = document.createElement("small");
        date.className = "dashboard-event-date";
        date.textContent = formatDate(event.date);

        const details = document.createElement("div");
        details.className = "dashboard-event-details";

        details.appendChild(title);
        details.appendChild(car);
        details.appendChild(description);
        details.appendChild(date);

        const amount = document.createElement("strong");
        amount.className = "dashboard-event-amount";

        amount.textContent = event.amount > 0
            ? formatMoney(event.amount)
            : "—";

        info.appendChild(details);

        item.appendChild(icon);
        item.appendChild(info);
        item.appendChild(amount);

        eventsList.appendChild(item);
    });
}


// ==========================================
// РАСЧЁТ БЛИЖАЙШЕГО ОБСЛУЖИВАНИЯ
// ==========================================

function getServiceStatus(service) {
    const car = savedCars.find(function(item) {
        return item.brand + " " + item.model === service.car;
    });

    if (!car) return null;

    const currentMileage = Number(car.mileage) || 0;
    const today = getToday();

    const nextMileage = Number(service.nextMileage) || 0;
    const nextDate = service.nextDate || "";

    const mileageSet = nextMileage > 0;
    const dateSet = nextDate !== "";

    if (!mileageSet && !dateSet) return null;

    const mileageLeft = mileageSet
        ? nextMileage - currentMileage
        : Infinity;

    const dateOverdue = dateSet && nextDate <= today;
    const mileageOverdue = mileageSet && mileageLeft <= 0;

    if (dateOverdue || mileageOverdue) {
        return {
            status: "overdue",
            text: "Пора обслужить",
            mileageLeft: mileageLeft,
            date: nextDate
        };
    }

    let text = "";

    if (mileageSet && dateSet) {
        text = "Через " + formatMileage(mileageLeft) +
            " или до " + formatDate(nextDate);
    } else if (mileageSet) {
        text = "Через " + formatMileage(mileageLeft);
    } else {
        text = "До " + formatDate(nextDate);
    }

    return {
        status: "upcoming",
        text: text,
        mileageLeft: mileageLeft,
        date: nextDate
    };
}

function getUpcomingServices() {
    return savedServices
        .map(function(service, index) {
            const status = getServiceStatus(service);

            if (!status) return null;

            return {
                ...service,
                originalIndex: index,
                serviceStatus: status
            };
        })
        .filter(Boolean)
        .sort(function(a, b) {
            if (a.serviceStatus.status === "overdue" &&
                b.serviceStatus.status !== "overdue") {
                return -1;
            }

            if (b.serviceStatus.status === "overdue" &&
                a.serviceStatus.status !== "overdue") {
                return 1;
            }

            return a.serviceStatus.mileageLeft -
                b.serviceStatus.mileageLeft;
        });
}


// ==========================================
// СТАТИСТИКА ОБСЛУЖИВАНИЯ
// ==========================================

function updateServiceStats() {
    const serviceCount = document.getElementById("service-count");
    const nextService = document.getElementById("next-service");
    const serviceExpenses = document.getElementById("service-expenses");
    const dashboardService = document.getElementById("dashboard-service");

    const totalServiceExpenses = savedServices.reduce(function(total, service) {
        return total + (Number(service.amount) || 0);
    }, 0);

    const upcoming = getUpcomingServices();
    const nearest = upcoming[0];

    if (serviceCount) {
        serviceCount.textContent = savedServices.length;
    }

    if (serviceExpenses) {
        serviceExpenses.textContent = formatMoney(totalServiceExpenses);
    }

    if (nextService) {
        if (!nearest) {
            nextService.textContent = "—";
        } else if (nearest.serviceStatus.status === "overdue") {
            nextService.textContent = "Пора на ТО";
        } else if (nearest.serviceStatus.mileageLeft !== Infinity) {
            nextService.textContent =
                formatMileage(nearest.serviceStatus.mileageLeft);
        } else {
            nextService.textContent = formatDate(nearest.nextDate);
        }
    }

    if (dashboardService) {
        if (!nearest) {
            dashboardService.textContent = "—";
        } else if (nearest.serviceStatus.status === "overdue") {
            dashboardService.textContent = "Пора на ТО";
        } else if (nearest.serviceStatus.mileageLeft !== Infinity) {
            dashboardService.textContent =
                formatMileage(nearest.serviceStatus.mileageLeft);
        } else {
            dashboardService.textContent = formatDate(nearest.nextDate);
        }
    }
}


// ==========================================
// ОБНОВЛЕНИЕ ГЛАВНОЙ ПАНЕЛИ
// ==========================================

function updateDashboard() {
    const carsCount = savedCars.length;

    const totalMileage = savedCars.reduce(function(total, car) {
        return total + (Number(car.mileage) || 0);
    }, 0);

    const totalExpenses = calculateTotalExpenses();

    const dashboardCarsCount = document.getElementById("dashboard-cars-count");
    const dashboardMileage = document.getElementById("dashboard-mileage");
    const dashboardExpenses = document.getElementById("dashboard-expenses");

    if (dashboardCarsCount) {
        dashboardCarsCount.textContent = carsCount;
    }

    if (dashboardMileage) {
        dashboardMileage.textContent = formatMileage(totalMileage);
    }

    if (dashboardExpenses) {
        dashboardExpenses.textContent = formatMoney(totalExpenses);
    }

    const expensesTotal = document.getElementById("expenses-total");
    const expensesCount = document.getElementById("expenses-count");

    if (expensesTotal) {
        expensesTotal.textContent = formatMoney(totalExpenses);
    }

    if (expensesCount) {
        expensesCount.textContent = savedExpenses.length;
    }

    renderDashboardGarage();
    renderDashboardEvents();
    updateServiceStats();
}


// ==========================================
// ДОБАВЛЕНИЕ АВТОМОБИЛЕЙ
// ==========================================

function addCarToPage(car, index) {
    const newCar = document.createElement("section");
    newCar.classList.add("car-card");

    const title = document.createElement("h2");
    title.textContent = car.brand + " " + car.model;

    const carImage = document.createElement("img");
    carImage.src = car.image || "";
    carImage.alt = car.brand + " " + car.model;

    const yearText = document.createElement("p");
    yearText.textContent = "Год выпуска: " + (car.year || "Не указан");

    const engineText = document.createElement("p");
    engineText.textContent = "Двигатель: " + (car.engine || "Не указан");

    const mileageText = document.createElement("p");
    mileageText.textContent = "Пробег: " + formatMileage(car.mileage);

    const editButton = document.createElement("button");
    editButton.textContent = "Изменить пробег";

    editButton.addEventListener("click", function() {
        const newMileage = prompt("Введи новый пробег:");

        if (newMileage === null || newMileage.trim() === "") {
            return;
        }

        const mileage = Number(newMileage);

        if (!Number.isFinite(mileage) || mileage < 0) {
            alert("Введи корректный пробег!");
            return;
        }

        savedCars[index].mileage = mileage;

        saveCars();
        renderCars();
        renderUpcomingServices();
        updateDashboard();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";

    deleteButton.addEventListener("click", function() {
        const confirmed = confirm("Удалить этот автомобиль?");

        if (!confirmed) return;

        const deletedCar = savedCars[index];
        const deletedCarName = deletedCar.brand + " " + deletedCar.model;

        savedCars.splice(index, 1);

        for (let i = savedExpenses.length - 1; i >= 0; i--) {
            if (savedExpenses[i].car === deletedCarName) {
                savedExpenses.splice(i, 1);
            }
        }

        for (let i = savedServices.length - 1; i >= 0; i--) {
            if (savedServices[i].car === deletedCarName) {
                savedServices.splice(i, 1);
            }
        }

        saveCars();
        saveExpenses();
        saveServices();

        renderCars();
        renderExpenses();
        renderServices();
        updateDashboard();
    });

    newCar.appendChild(title);
    newCar.appendChild(carImage);
    newCar.appendChild(yearText);
    newCar.appendChild(engineText);
    newCar.appendChild(mileageText);
    newCar.appendChild(editButton);
    newCar.appendChild(deleteButton);

    carsList.appendChild(newCar);
}


// ==========================================
// ОТОБРАЖЕНИЕ АВТОМОБИЛЕЙ
// ==========================================

function renderCars() {
    if (!carsList) return;

    carsList.innerHTML = "";

    savedCars.forEach(function(car, index) {
        addCarToPage(car, index);
    });

    updateDashboard();
}


// ==========================================
// ОТКРЫТИЕ ФОРМЫ АВТОМОБИЛЯ
// ==========================================

if (button && form) {
    button.addEventListener("click", function() {
        form.style.display = form.style.display === "none"
            ? "block"
            : "none";
    });
}


// ==========================================
// СОХРАНЕНИЕ АВТОМОБИЛЯ
// ==========================================

if (saveButton && form) {
    saveButton.addEventListener("click", function() {
        const brand = document.getElementById("car-brand").value.trim();
        const model = document.getElementById("car-model").value.trim();
        const mileageInput = document.getElementById("car-mileage").value;
        const mileage = Number(mileageInput);
        const year = Number(document.getElementById("car-year").value);
        const engine = document.getElementById("car-engine").value.trim();
        const image = document.getElementById("car-image").value.trim();

        if (
            brand === "" ||
            model === "" ||
            mileageInput === "" ||
            !Number.isFinite(mileage) ||
            mileage < 0
        ) {
            alert("Заполни марку, модель и корректный пробег!");
            return;
        }

        const car = {
            brand: brand,
            model: model,
            year: year || "",
            engine: engine,
            mileage: mileage,
            image: image
        };

        savedCars.push(car);

        saveCars();
        renderCars();

        document.getElementById("car-brand").value = "";
        document.getElementById("car-model").value = "";
        document.getElementById("car-mileage").value = "";
        document.getElementById("car-year").value = "";
        document.getElementById("car-engine").value = "";
        document.getElementById("car-image").value = "";

        form.style.display = "none";
    });
}


// ==========================================
// ВЫБОР АВТОМОБИЛЯ В ФОРМАХ
// ==========================================

function fillCarSelect(selectElement) {
    if (!selectElement) return;

    selectElement.innerHTML = "";

    if (savedCars.length === 0) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "Сначала добавь автомобиль";
        selectElement.appendChild(option);
        return;
    }

    savedCars.forEach(function(car, index) {
        const option = document.createElement("option");

        option.value = index;
        option.textContent = car.brand + " " + car.model;

        selectElement.appendChild(option);
    });
}


// ==========================================
// ОТКРЫТИЕ ФОРМЫ РАСХОДОВ
// ==========================================

if (addExpenseButton && expenseForm) {
    addExpenseButton.addEventListener("click", function() {
        fillCarSelect(expenseCar);

        if (expenseDate) {
            expenseDate.value = getToday();
        }

        expenseForm.style.display =
            expenseForm.style.display === "none" ? "block" : "none";
    });
}


// ==========================================
// СОХРАНЕНИЕ РАСХОДА
// ==========================================

if (saveExpenseButton) {
    saveExpenseButton.addEventListener("click", function() {
        const carIndex = expenseCar ? expenseCar.value : "";
        const category = expenseCategory ? expenseCategory.value : "";
        const amount = expenseAmount ? Number(expenseAmount.value) : 0;
        const date = expenseDate ? expenseDate.value : "";
        const description = expenseDescription
            ? expenseDescription.value.trim()
            : "";

        if (savedCars.length === 0) {
            alert("Сначала добавь автомобиль в гараж!");
            return;
        }

        if (carIndex === "" || !savedCars[Number(carIndex)]) {
            alert("Выбери автомобиль!");
            return;
        }

        if (!Number.isFinite(amount) || amount <= 0) {
            alert("Введи корректную сумму!");
            return;
        }

        if (date === "") {
            alert("Укажи дату расхода!");
            return;
        }

        const selectedCar = savedCars[Number(carIndex)];

        const expense = {
            car: selectedCar.brand + " " + selectedCar.model,
            category: category,
            amount: amount,
            date: date,
            description: description
        };

        savedExpenses.push(expense);

        saveExpenses();
        renderExpenses();
        updateDashboard();

        expenseAmount.value = "";
        expenseDescription.value = "";

        if (expenseForm) {
            expenseForm.style.display = "none";
        }

        alert("Расход успешно сохранён!");
    });
}


// ==========================================
// ОТОБРАЖЕНИЕ РАСХОДОВ
// ==========================================

function renderExpenses() {
    if (!expensesList) return;

    expensesList.innerHTML = "";

    if (savedExpenses.length === 0) {
        expensesList.innerHTML = "<p>Пока расходов нет.</p>";
        updateDashboard();
        return;
    }

    const sortedExpenses = savedExpenses
        .map(function(expense, index) {
            return { ...expense, originalIndex: index };
        })
        .sort(function(a, b) {
            return b.date.localeCompare(a.date);
        });

    sortedExpenses.forEach(function(expense) {
        const item = document.createElement("div");
        item.className = "expense-item";

        const date = document.createElement("div");
        date.className = "expense-date";
        date.textContent = formatDate(expense.date);

        const info = document.createElement("div");
        info.className = "expense-info";

        const category = document.createElement("h3");
        category.textContent = expense.category;

        const car = document.createElement("p");
        car.textContent = expense.car;

        const description = document.createElement("span");
        description.textContent = expense.description || "Без описания";

        const amount = document.createElement("strong");
        amount.className = "expense-amount";
        amount.textContent = formatMoney(expense.amount);

        const deleteButton = document.createElement("button");
        deleteButton.className = "expense-delete";
        deleteButton.textContent = "Удалить";

        deleteButton.addEventListener("click", function() {
            if (!confirm("Удалить этот расход?")) return;

            savedExpenses.splice(expense.originalIndex, 1);

            saveExpenses();
            renderExpenses();
            updateDashboard();
        });

        info.appendChild(category);
        info.appendChild(car);
        info.appendChild(description);

        item.appendChild(date);
        item.appendChild(info);
        item.appendChild(amount);
        item.appendChild(deleteButton);

        expensesList.appendChild(item);
    });

    updateDashboard();
}


// ==========================================
// ОТКРЫТИЕ ФОРМЫ ОБСЛУЖИВАНИЯ
// ==========================================

if (addServiceButton && serviceForm) {
    addServiceButton.addEventListener("click", function() {
        fillCarSelect(serviceCar);

        if (savedCars.length === 0) {
            alert("Сначала добавь автомобиль в гараж!");
            return;
        }

        if (serviceDate) {
            serviceDate.value = getToday();
        }

        if (serviceCar && serviceMileage) {
            const car = savedCars[Number(serviceCar.value)];

            if (car) {
                serviceMileage.value = car.mileage || 0;
            }
        }

        serviceForm.style.display =
            serviceForm.style.display === "none" ? "block" : "none";
    });
}


// ==========================================
// ПОДСТАНОВКА ПРОБЕГА ПРИ ВЫБОРЕ АВТОМОБИЛЯ
// ==========================================

if (serviceCar && serviceMileage) {
    serviceCar.addEventListener("change", function() {
        const car = savedCars[Number(serviceCar.value)];

        if (car) {
            serviceMileage.value = car.mileage || 0;
        }
    });
}


// ==========================================
// СОХРАНЕНИЕ ОБСЛУЖИВАНИЯ
// ==========================================

if (saveServiceButton) {
    saveServiceButton.addEventListener("click", function() {
        const carIndex = serviceCar ? serviceCar.value : "";
        const category = serviceCategory ? serviceCategory.value : "";
        const date = serviceDate ? serviceDate.value : "";
        const mileage = serviceMileage ? Number(serviceMileage.value) : NaN;
        const amount = serviceAmount && serviceAmount.value !== ""
            ? Number(serviceAmount.value)
            : 0;

        const nextMileage = serviceNextMileage &&
            serviceNextMileage.value !== ""
                ? Number(serviceNextMileage.value)
                : 0;

        const nextDate = serviceNextDate
            ? serviceNextDate.value
            : "";

        const description = serviceDescription
            ? serviceDescription.value.trim()
            : "";

        if (savedCars.length === 0) {
            alert("Сначала добавь автомобиль в гараж!");
            return;
        }

        if (carIndex === "" || !savedCars[Number(carIndex)]) {
            alert("Выбери автомобиль!");
            return;
        }

        if (date === "") {
            alert("Укажи дату обслуживания!");
            return;
        }

        if (!Number.isFinite(mileage) || mileage < 0) {
            alert("Укажи корректный пробег!");
            return;
        }

        if (!Number.isFinite(amount) || amount < 0) {
            alert("Укажи корректную стоимость!");
            return;
        }

        if (nextMileage < 0 || !Number.isFinite(nextMileage)) {
            alert("Укажи корректный следующий пробег!");
            return;
        }

        if (nextMileage > 0 && nextMileage <= mileage) {
            alert("Следующий пробег ТО должен быть больше текущего!");
            return;
        }

        if (nextDate && nextDate <= date) {
            alert("Дата следующего ТО должна быть позже даты обслуживания!");
            return;
        }

        const selectedCar = savedCars[Number(carIndex)];
        const carName = selectedCar.brand + " " + selectedCar.model;

        const serviceId = Date.now().toString() +
            Math.random().toString(36).slice(2, 7);

        const service = {
            id: serviceId,
            car: carName,
            category: category,
            date: date,
            mileage: mileage,
            amount: amount,
            nextMileage: nextMileage,
            nextDate: nextDate,
            description: description
        };

        savedServices.push(service);

        // Обновляем пробег автомобиля, если он увеличился.

        if (mileage > Number(selectedCar.mileage || 0)) {
            selectedCar.mileage = mileage;
            saveCars();
            renderCars();
        }

        // Добавляем стоимость обслуживания в общие расходы.
        // В ленте это будет отображаться одним событием обслуживания.

        if (amount > 0) {
            savedExpenses.push({
                car: carName,
                category: "Обслуживание",
                amount: amount,
                date: date,
                description: category + ": " +
                    (description || "Обслуживание автомобиля"),
                serviceId: serviceId
            });

            saveExpenses();
            renderExpenses();
        }

        saveServices();

        renderServices();
        updateDashboard();

        if (serviceAmount) serviceAmount.value = "";
        if (serviceNextMileage) serviceNextMileage.value = "";
        if (serviceNextDate) serviceNextDate.value = "";
        if (serviceDescription) serviceDescription.value = "";

        serviceForm.style.display = "none";

        alert("Обслуживание успешно сохранено!");
    });
}


// ==========================================
// ОТОБРАЖЕНИЕ ИСТОРИИ ОБСЛУЖИВАНИЯ
// ==========================================

function renderServices() {
    if (!serviceList) return;

    serviceList.innerHTML = "";

    if (savedServices.length === 0) {
        serviceList.innerHTML =
            "<p>Пока нет записей об обслуживании.</p>";

        renderUpcomingServices();
        updateDashboard();
        return;
    }

    const sortedServices = savedServices
        .map(function(service, index) {
            return { ...service, originalIndex: index };
        })
        .sort(function(a, b) {
            return b.date.localeCompare(a.date);
        });

    sortedServices.forEach(function(service) {
        const item = document.createElement("div");
        item.className = "expense-item";

        const date = document.createElement("div");
        date.className = "expense-date";
        date.textContent = formatDate(service.date);

        const info = document.createElement("div");
        info.className = "expense-info";

        const category = document.createElement("h3");
        category.textContent = service.category;

        const car = document.createElement("p");
        car.textContent = service.car;

        const details = document.createElement("span");
        details.textContent =
            formatMileage(service.mileage) +
            (service.description ? " · " + service.description : "");

        const amount = document.createElement("strong");
        amount.className = "expense-amount";
        amount.textContent = formatMoney(service.amount);

        const deleteButton = document.createElement("button");
        deleteButton.className = "expense-delete";
        deleteButton.textContent = "Удалить";

        deleteButton.addEventListener("click", function() {
            if (!confirm("Удалить эту запись об обслуживании?")) return;

            const deletedService = savedServices[service.originalIndex];

            savedServices.splice(service.originalIndex, 1);

            // Удаляем связанный расход, если он был создан автоматически.

            for (let i = savedExpenses.length - 1; i >= 0; i--) {
                if (deletedService.id &&
                    savedExpenses[i].serviceId === deletedService.id) {
                    savedExpenses.splice(i, 1);
                }
            }

            saveServices();
            saveExpenses();

            renderServices();
            renderExpenses();
            updateDashboard();
        });

        info.appendChild(category);
        info.appendChild(car);
        info.appendChild(details);

        item.appendChild(date);
        item.appendChild(info);
        item.appendChild(amount);
        item.appendChild(deleteButton);

        serviceList.appendChild(item);
    });

    renderUpcomingServices();
    updateDashboard();
}


// ==========================================
// ОТОБРАЖЕНИЕ ПРЕДСТОЯЩЕГО ТО
// ==========================================

function renderUpcomingServices() {
    if (!upcomingServiceList) return;

    upcomingServiceList.innerHTML = "";

    const upcoming = getUpcomingServices();

    if (upcoming.length === 0) {
        upcomingServiceList.innerHTML =
            "<p>Пока нет запланированных работ.</p>";
        return;
    }

    upcoming.forEach(function(service) {
        const item = document.createElement("div");
        item.className = "expense-item";

        const info = document.createElement("div");
        info.className = "expense-info";

        const title = document.createElement("h3");
        title.textContent = service.category;

        const car = document.createElement("p");
        car.textContent = service.car;

        const details = document.createElement("span");
        details.textContent = service.serviceStatus.text;

        const status = document.createElement("strong");
        status.className = "expense-amount";

        if (service.serviceStatus.status === "overdue") {
            status.textContent = "Пора на ТО";
        } else {
            status.textContent = "Запланировано";
        }

        info.appendChild(title);
        info.appendChild(car);
        info.appendChild(details);

        item.appendChild(info);
        item.appendChild(status);

        upcomingServiceList.appendChild(item);
    });
}


// ==========================================
// АНАЛИТИКА ПРОДАЖ АВТОМОБИЛЕЙ
// ==========================================

const salesData = [
    { month: "Янв 21", gac: 27, toyota: 58 },
    { month: "Фев 21", gac: 21, toyota: 146 },
    { month: "Мар 21", gac: 68, toyota: 203 },
    { month: "Апр 21", gac: 63, toyota: 182 },
    { month: "Май 21", gac: 64, toyota: 139 },
    { month: "Июн 21", gac: 74, toyota: 138 },
    { month: "Июл 21", gac: 62, toyota: 46 },
    { month: "Авг 21", gac: 72, toyota: 129 },
    { month: "Сен 21", gac: 74, toyota: 64 },
    { month: "Окт 21", gac: 108, toyota: 51 },
    { month: "Ноя 21", gac: 174, toyota: 19 },
    { month: "Дек 21", gac: 116, toyota: 72 },
    { month: "Янв 22", gac: 81, toyota: 18 },
    { month: "Фев 22", gac: 53, toyota: 19 },
    { month: "Мар 22", gac: 22, toyota: 13 },
    { month: "Апр 22", gac: 20, toyota: 6 },
    { month: "Май 22", gac: 9, toyota: 11 },
    { month: "Июн 22", gac: 7, toyota: 2 },
    { month: "Июл 22", gac: 1, toyota: 1 },
    { month: "Авг 22", gac: 77, toyota: 5 },
    { month: "Сен 22", gac: 76, toyota: 1 },
    { month: "Окт 22", gac: 42, toyota: 2 },
    { month: "Ноя 22", gac: 31, toyota: 1 },
    { month: "Дек 22", gac: 18, toyota: 1 }
];

const periodSlider = document.getElementById("period-slider");
const periodValue = document.getElementById("period-value");
const gacTotal = document.getElementById("gac-total");
const toyotaTotal = document.getElementById("toyota-total");
const salesChart = document.getElementById("sales-chart");

const numberFormat = new Intl.NumberFormat("ru-RU");

function updateMarketStats() {
    if (!periodSlider || !periodValue || !gacTotal || !toyotaTotal) {
        return;
    }

    const period = Number(periodSlider.value);
    const selectedData = salesData.slice(-period);

    const gacSum = selectedData.reduce(
        (sum, item) => sum + item.gac, 0
    );

    const toyotaSum = selectedData.reduce(
        (sum, item) => sum + item.toyota, 0
    );

    periodValue.textContent = period + " мес.";
    gacTotal.textContent = numberFormat.format(gacSum);
    toyotaTotal.textContent = numberFormat.format(toyotaSum);

    renderSalesChart(selectedData);
}

function renderSalesChart(data) {
    if (!salesChart) return;

    salesChart.innerHTML = "";

    const maxSales = Math.max(
        ...data.map(item => Math.max(item.gac, item.toyota)),
        1
    );

    data.forEach(function(item) {
        const month = document.createElement("div");
        month.className = "chart-month";

        const bars = document.createElement("div");
        bars.className = "chart-bars";

        const gacBar = document.createElement("div");
        gacBar.className = "chart-bar chart-bar-gac";
        gacBar.style.height = (item.gac / maxSales * 100) + "%";
        gacBar.title = "GAC GS8: " + item.gac;

        const toyotaBar = document.createElement("div");
        toyotaBar.className = "chart-bar chart-bar-toyota";
        toyotaBar.style.height = (item.toyota / maxSales * 100) + "%";
        toyotaBar.title = "Toyota Corolla: " + item.toyota;

        const label = document.createElement("span");
        label.className = "chart-month-label";
        label.textContent = item.month;

        bars.appendChild(gacBar);
        bars.appendChild(toyotaBar);

        month.appendChild(bars);
        month.appendChild(label);

        salesChart.appendChild(month);
    });
}

if (periodSlider) {
    periodSlider.addEventListener("input", updateMarketStats);
}


// ==========================================
// ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ
// ==========================================

const dashboardLink = document.getElementById("dashboard-link");
const garageLink = document.getElementById("garage-link");
const marketLink = document.getElementById("market-link");
const serviceLink = document.getElementById("service-link");
const expensesLink = document.getElementById("expenses-link");

const dashboardPage = document.getElementById("dashboard-page");
const garagePage = document.getElementById("garage-page");
const marketPage = document.getElementById("market-page");
const servicePage = document.getElementById("service-page");
const expensesPage = document.getElementById("expenses-page");

function showPage(page) {
    const pages = {
        dashboard: [dashboardPage, dashboardLink],
        garage: [garagePage, garageLink],
        market: [marketPage, marketLink],
        service: [servicePage, serviceLink],
        expenses: [expensesPage, expensesLink]
    };

    Object.values(pages).forEach(function(item) {
        if (item[0]) {
            item[0].style.display = "none";
        }

        if (item[1]) {
            item[1].classList.remove("active");
        }
    });

    const selectedPage = pages[page];

    if (selectedPage) {
        if (selectedPage[0]) {
            selectedPage[0].style.display = "block";
        }

        if (selectedPage[1]) {
            selectedPage[1].classList.add("active");
        }

        localStorage.setItem("lastPage", page);
    }
}

function addPageListener(link, page) {
    if (!link) return;

    link.addEventListener("click", function(event) {
        event.preventDefault();
        showPage(page);
    });
}

addPageListener(dashboardLink, "dashboard");
addPageListener(garageLink, "garage");
addPageListener(marketLink, "market");
addPageListener(serviceLink, "service");
addPageListener(expensesLink, "expenses");


// ==========================================
// КНОПКА ПЕРЕХОДА В ГАРАЖ С ГЛАВНОЙ
// ==========================================

const dashboardGarageButton = document.getElementById(
    "dashboard-garage-button"
);

if (dashboardGarageButton) {
    dashboardGarageButton.addEventListener("click", function() {
        showPage("garage");
    });
}


// ==========================================
// ЗАПУСК ПРИЛОЖЕНИЯ
// ==========================================

renderCars();
renderExpenses();
renderServices();
updateMarketStats();

const lastPage = localStorage.getItem("lastPage") || "dashboard";
showPage(lastPage);


// ==========================================
// НАСТРОЙКИ
// ==========================================

const settingsLink = document.getElementById("settings-link");
const settingsOverlay = document.getElementById("settings-overlay");
const closeSettings = document.getElementById("close-settings");
const themeOptions = document.querySelectorAll(".theme-option");

if (settingsLink && settingsOverlay) {
    settingsLink.addEventListener("click", function(event) {
        event.preventDefault();
        settingsOverlay.classList.add("open");
    });
}

if (closeSettings && settingsOverlay) {
    closeSettings.addEventListener("click", function() {
        settingsOverlay.classList.remove("open");
    });
}

if (settingsOverlay) {
    settingsOverlay.addEventListener("click", function(event) {
        if (event.target === settingsOverlay) {
            settingsOverlay.classList.remove("open");
        }
    });
}


// ==========================================
// СМЕНА ТЕМЫ
// ==========================================

function applyTheme(theme) {
    document.body.classList.toggle("light-theme", theme === "light");
    document.body.classList.toggle("vice-city-theme", theme === "vice-city");

    themeOptions.forEach(function(option) {
        const isActive = option.dataset.theme === theme;

        option.classList.toggle("active", isActive);

        const check = option.querySelector(".theme-check");

        if (check) {
            check.textContent = isActive ? "✓" : "";
        }
    });

    localStorage.setItem("theme", theme);
}

themeOptions.forEach(function(option) {
    option.addEventListener("click", function() {
        applyTheme(option.dataset.theme);
    });
});

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);
