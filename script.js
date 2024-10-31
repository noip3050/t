const timings = {
    redDuration: 3 * 60 + 24,  // اللون الأحمر لمدة 3 دقائق و24 ثانية (204 ثواني)
    greenDuration: 35,         // اللون الأخضر لمدة 35 ثانية
    yellowDuration: 5          // اللون الأصفر لمدة 5 ثواني
};

// نقطة البداية للعد (11:31 مساءً و46 ثانية)
const startHour = 23;
const startMinute = 31;
const startSecond = 46;

// دالة لتفعيل اللون
function activateColor(color, duration) {
    document.querySelectorAll('.light').forEach(light => light.classList.remove('active'));
    document.getElementById(color).classList.add('active');

    // تعيين العداد التنازلي
    document.getElementById('countdown').textContent = duration; // تعيين الوقت المبدئي
    startCountdown(duration);
}

// دالة لبدء العد التنازلي
function startCountdown(duration) {
    let countdown = duration;
    const countdownInterval = setInterval(() => {
        countdown--;
        document.getElementById('countdown').textContent = countdown;

        // إذا انتهى العد، أوقف العد
        if (countdown <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

// دالة لتحديد اللون الحالي بناءً على التوقيت الفعلي
function updateTrafficLight() {
    const now = new Date();
    
    // حساب بداية العد بناءً على الساعة 11:31:46 مساءً
    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, startSecond);
    
    // إذا كانت الساعة الحالية أقل من نقطة البداية، يجب الانتقال إلى اليوم السابق
    if (now < startTime) {
        startTime.setDate(startTime.getDate() - 1); // تراجع يوم واحد
    }
    
    const elapsedSeconds = Math.floor((now - startTime) / 1000); // حساب الزمن المنقضي بالثواني

    // حساب الدورة الزمنية الكاملة
    const cycleTime = timings.redDuration + timings.yellowDuration + timings.greenDuration;
    const positionInCycle = elapsedSeconds % cycleTime;

    if (positionInCycle < timings.redDuration) {
        activateColor('red', timings.redDuration - positionInCycle);
    } else if (positionInCycle < timings.redDuration + timings.greenDuration) {
        activateColor('green', timings.greenDuration - (positionInCycle - timings.redDuration));
    } else {
        activateColor('yellow', timings.yellowDuration - (positionInCycle - (timings.redDuration + timings.greenDuration)));
    }
}

// تحديث الإشارة كل ثانية للتحقق من التوقيت الحقيقي
setInterval(updateTrafficLight, 1000);
updateTrafficLight(); // التحديث عند بدء التشغيل
