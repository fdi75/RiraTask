"use strict";
const rateInput = document.querySelector("#rate"); //ورودی نرخ دلار
let rialInput = document.querySelector("#rial-price"); //ورودی مبلغ ریالی
let dollarInput = document.querySelector("#dollar-price"); //ورودی مبلغ دلاری
const errPTag = document.querySelector(".err-p"); //تگ پی جهت ارور مبلغ دلاری و ریالی
const resultTag = document.querySelector(".result-price"); //تگ نمایش نتیجه
const resultBtn = document.querySelector(".submit-btn"); //دکمه نمایش نتیجه
let rateContainer = document.querySelector(".getPrice"); // سکشن دریافت نرخ
let defaultRate = 800000; //نرخ پیشفرض
//غیر فعال سازی یکی از فیلد ها هنگام پر شدن دیگری
rialInput.addEventListener("input", () => {
    if (rialInput.value.trim() !== "") {
        dollarInput.disabled = true;
    }
    else {
        dollarInput.disabled = false;
    }
});
dollarInput.addEventListener("input", () => {
    if (dollarInput.value.trim() !== "") {
        rialInput.disabled = true;
    }
    else {
        rialInput.disabled = false;
    }
});
//افزودن ایونت کلیک به دکمه سابمیت
function calculateRes() {
    //  ذخیره نرخ مدنظر کاربر یا ذخیره مقدار پیشفرض
    const rate = Number(rateInput.value);
    const finalRate = isNaN(rate) || rate === 0 ? defaultRate : rate;
    // ذخیره مقدار ریالی
    const rial = Number(rialInput.value);
    // ذخیره مقدار ذلاری
    const dollar = Number(dollarInput.value);
    resultTag.innerText = "";
    const rialFilled = rialInput.value.trim() !== "" && !isNaN(rial);
    const dollarFilled = dollarInput.value.trim() !== "" && !isNaN(dollar);
    // محاسبه نتیجه به دلار
    if (rialFilled && !dollarFilled) {
        const res = (rial / finalRate).toLocaleString("en-US");
        resultTag.innerText = `${res} $`;
        resultTag.style.backgroundColor = "#125f5b";
        resultTag.style.color = "rgb(255, 255, 255)";
        resultTag.style.borderRadius = "5px";
        dollarInput.disabled = false;
        rialInput.value = "";
        //محاسبه نتیجه به ریال
    }
    else if (!rialFilled && dollarFilled) {
        const res = (dollar * finalRate).toLocaleString("fa-IR");
        resultTag.innerText = `ریال ${res}`;
        resultTag.style.backgroundColor = "#125f5b";
        resultTag.style.color = "rgb(255, 255, 255)";
        resultTag.style.borderRadius = "5px";
        resultTag.style.fontSize = "2.2rem";
        rialInput.disabled = false;
        dollarInput.value = "";
    }
}
;
resultBtn.addEventListener("click", calculateRes);
// تابع جهت استفاده از دکمه اینتر کیبورد ب جای باتن نمایش
function handleEnterKey(e) {
    if (e.key === "Enter") {
        calculateRes();
    }
}
rialInput.addEventListener("keydown", handleEnterKey);
dollarInput.addEventListener("keydown", handleEnterKey);
