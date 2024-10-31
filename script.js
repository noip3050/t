const timings = {
    redDuration: 3,   // 3 دقائق
    yellowDuration: 0.25, // 15 ثانية
    greenDuration: 3   // 3 دقائق
};

// دالة لتفعيل اللون
function activateColor(color) {
    document.querySelectorAll('.light').forEach(light => light.classList.remove('active'));
    document.getElementById(color).classList.add('active');
}

// دالة لتحديد اللون الحالي بناءً على الوقت
function updateTrafficLight() {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes(); // تحويل الوقت إلى دقائق

    // حساب الدورة الزمنية بناءً على الألوان
    const cycleTime = timings.redDuration + timings.yellowDuration + timings.greenDuration;
    const positionInCycle = minutes % cycleTime;

    if (positionInCycle < timings.redDuration) {
        activateColor('red');
    } else if (positionInCycle < timings.redDuration + timings.yellowDuration) {
        activateColor('yellow');
    } else {
        activateColor('green');
    }
}

// بدء عملية تحديث الإشارة
setInterval(updateTrafficLight, 1000); // تحديث كل ثانية
updateTrafficLight(); // تحديث عند بدء التشغيل
