
function validateFields(ids, resultId) {

    for (let i = 0; i < ids.length; i++) {

        let value = document.getElementById(ids[i]).value;

        if (value === "") {

            document.getElementById(resultId).innerHTML =
                "⚠️ Please fill in all fields.";

            return false;
        }
    }

    return true;
}

function calculatePips() {

    if (!validateFields(["lots", "pips"], "pipResult")) {
        return;
    }

    let lots = Number(document.getElementById("lots").value);

    let pips = Number(document.getElementById("pips").value);

    let value = lots * pips * 10;

    document.getElementById("pipResult").innerHTML =
        "💰 Estimated Value<br>$" + value.toFixed(2);
}

function calculatePips() {

    let lots = document.getElementById("lots").value;
    let pips = document.getElementById("pips").value;

    if (lots === "" || pips === "") {
        document.getElementById("pipResult").innerHTML =
            "⚠️ Please fill in all fields.";
        return;
    }

    lots = Number(lots);
    pips = Number(pips);

    let value = lots * pips * 10;

    document.getElementById("pipResult").innerHTML =
        "💰 Estimated Value<br>$" + value.toFixed(2);
}

function calculateRisk() {

    if (!validateFields(["balance", "risk"], "riskResult")) {
        return;
    }

    let balance = Number(document.getElementById("balance").value);

    let risk = Number(document.getElementById("risk").value);

    let amount = balance * (risk / 100);

    document.getElementById("riskResult").innerHTML =
        "💰 You should risk<br>$" + amount.toFixed(2);
}

function calculateLotSize() {

    if (!validateFields(
        ["balance", "risk", "stoploss"],
        "lotResult"
    )) {
        return;
    }

    let balance = Number(document.getElementById("balance").value);
    let risk = Number(document.getElementById("risk").value);
    let stoploss = Number(document.getElementById("stoploss").value);

    if (stoploss <= 0) {
        document.getElementById("lotResult").innerHTML =
            "⚠️ Stop Loss must be greater than zero.";
        return;
    }

    let riskAmount = balance * (risk / 100);
    let lot = riskAmount / (stoploss * 10);

    document.getElementById("lotResult").innerHTML =
        "📊 Recommended Lot Size<br>" + lot.toFixed(2);
}

function calculateProfit() {

    if (!validateFields(
        ["entry", "exit", "lot"],
        "profitResult"
    )) {
        return;
    }

    let tradeType = document.getElementById("tradeType").value;

    let entry = Number(document.getElementById("entry").value);
    let exit = Number(document.getElementById("exit").value);
    let lot = Number(document.getElementById("lot").value);

    if (entry <= 0) {
        document.getElementById("profitResult").innerHTML =
            "⚠️ Entry Price must be greater than zero.";
        return;
    }

    if (exit <= 0) {
        document.getElementById("profitResult").innerHTML =
            "⚠️ Exit Price must be greater than zero.";
        return;
    }

    if (lot <= 0) {
        document.getElementById("profitResult").innerHTML =
            "⚠️ Lot Size must be greater than zero.";
        return;
    }

    let profit;

    if (tradeType === "buy") {
        profit = (exit - entry) * lot * 100;
    } else {
        profit = (entry - exit) * lot * 100;
    }

    document.getElementById("profitResult").innerHTML =
        "💰 <strong>Trade Result</strong><br><br>" +
        "Estimated Profit/Loss: $" + profit.toFixed(2);
}

function calculateMargin() {

    if (!validateFields(
        ["lotSize", "price", "leverage"],
        "marginResult"
    )) {
        return;
    }

    let lotSize = Number(document.getElementById("lotSize").value);
    let price = Number(document.getElementById("price").value);
    let leverage = Number(document.getElementById("leverage").value);

    if (lotSize <= 0) {
        document.getElementById("marginResult").innerHTML =
            "⚠️ Lot Size must be greater than zero.";
        return;
    }

    if (price <= 0) {
        document.getElementById("marginResult").innerHTML =
            "⚠️ Market Price must be greater than zero.";
        return;
    }

    if (leverage <= 0) {
        document.getElementById("marginResult").innerHTML =
            "⚠️ Leverage must be greater than zero.";
        return;
    }

    let contractSize = 100000;
    let margin = (lotSize * contractSize * price) / leverage;

    document.getElementById("marginResult").innerHTML =
        "💵 <strong>Required Margin</strong><br><br>$" +
        margin.toFixed(2);
}

function calculatePositionSize() {

    if (!validateFields(
        ["balance", "riskPercent", "stopLoss"],
        "positionResult"
    )) {
        return;
    }

    let balance = Number(document.getElementById("balance").value);
    let riskPercent = Number(document.getElementById("riskPercent").value);
    let stopLoss = Number(document.getElementById("stopLoss").value);

    if (balance <= 0) {
        document.getElementById("positionResult").innerHTML =
            "⚠️ Account Balance must be greater than zero.";
        return;
    }

    if (riskPercent <= 0) {
        document.getElementById("positionResult").innerHTML =
            "⚠️ Risk Percentage must be greater than zero.";
        return;
    }

    if (stopLoss <= 0) {
        document.getElementById("positionResult").innerHTML =
            "⚠️ Stop Loss must be greater than zero.";
        return;
    }

    let riskAmount = balance * (riskPercent / 100);
    let positionSize = riskAmount / (stopLoss * 10);

    document.getElementById("positionResult").innerHTML =
        "📊 <strong>Position Size</strong><br><br>" +
        positionSize.toFixed(2) + " Lots";
}

function calculateDrawdown() {

    if (!validateFields(
        ["drawdown"],
        "drawdownResult"
    )) {
        return;
    }

    let drawdown = Number(document.getElementById("drawdown").value);

    if (drawdown <= 0 || drawdown >= 100) {
        document.getElementById("drawdownResult").innerHTML =
            "⚠️ Please enter a drawdown between 1 and 99%.";
        return;
    }

    let recovery = (drawdown / (100 - drawdown)) * 100;

    document.getElementById("drawdownResult").innerHTML =
        "📉 <strong>Recovery Needed</strong><br><br>" +
        recovery.toFixed(2) + "%";
}

function calculateRiskReward() {

    if (!validateFields(
        ["riskAmount", "rewardAmount"],
        "riskResult"
    )) {
        return;
    }

    let risk = Number(document.getElementById("riskAmount").value);
    let reward = Number(document.getElementById("rewardAmount").value);

    if (risk <= 0) {
        document.getElementById("riskResult").innerHTML =
            "⚠️ Risk amount must be greater than zero.";
        return;
    }

    if (reward <= 0) {
        document.getElementById("riskResult").innerHTML =
            "⚠️ Reward amount must be greater than zero.";
        return;
    }

    let ratio = reward / risk;

    document.getElementById("riskResult").innerHTML =
        "⚖️ <strong>Risk-to-Reward Ratio</strong><br><br>" +
        "1 : " + ratio.toFixed(2);
}

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    let btn = document.getElementById("darkModeBtn");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme","dark");
        btn.innerHTML = "☀️ Light Mode";
    }else{
        localStorage.setItem("theme","light");
        btn.innerHTML = "🌙 Dark Mode";
    }

}

window.onload = function(){

    let btn = document.getElementById("darkModeBtn");

    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark-mode");
        btn.innerHTML = "☀️ Light Mode";
    }else{
        btn.innerHTML = "🌙 Dark Mode";
    }

}
window.onload = function(){

    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark-mode");
    }

}

function calculatePivot() {

    if (!validateFields(
        ["high", "low", "close"],
        "pivotResult"
    )) {
        return;
    }

    let high = Number(document.getElementById("high").value);
    let low = Number(document.getElementById("low").value);
    let close = Number(document.getElementById("close").value);

    // Extra validation
    if (high <= low) {
        document.getElementById("pivotResult").innerHTML =
            "⚠️ High Price must be greater than Low Price.";
        return;
    }

    let pp = (high + low + close) / 3;

    let r1 = (2 * pp) - low;
    let s1 = (2 * pp) - high;
    let r2 = pp + (high - low);
    let s2 = pp - (high - low);

    document.getElementById("pivotResult").innerHTML =
        "📊 <strong>Pivot Point Results</strong><br><br>" +
        "📍 Pivot Point: " + pp.toFixed(2) + "<br>" +
        "🔼 Resistance 1: " + r1.toFixed(2) + "<br>" +
        "🔽 Support 1: " + s1.toFixed(2) + "<br>" +
        "⏫ Resistance 2: " + r2.toFixed(2) + "<br>" +
        "⏬ Support 2: " + s2.toFixed(2);
}

function calculateGoldProfit() {

    if (!validateFields(
        ["entry", "exit", "lots"],
        "goldResult"
    )) {
        return;
    }

    let trade = document.getElementById("tradeType").value;

    let entry = Number(document.getElementById("entry").value);
    let exit = Number(document.getElementById("exit").value);
    let lots = Number(document.getElementById("lots").value);

    if (entry <= 0) {
        document.getElementById("goldResult").innerHTML =
            "⚠️ Entry price must be greater than zero.";
        return;
    }

    if (exit <= 0) {
        document.getElementById("goldResult").innerHTML =
            "⚠️ Exit price must be greater than zero.";
        return;
    }

    if (lots <= 0) {
        document.getElementById("goldResult").innerHTML =
            "⚠️ Lot size must be greater than zero.";
        return;
    }

    let difference;

    if (trade === "buy") {
        difference = exit - entry;
    } else {
        difference = entry - exit;
    }

    let profit = difference * lots * 100;

    document.getElementById("goldResult").innerHTML =
        "🥇 <strong>Gold Trade Result</strong><br><br>" +
        "💰 Estimated Profit/Loss: $" + profit.toFixed(2);
}

function resetForm(){

    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => input.value = "");

    const selects = document.querySelectorAll("select");

    selects.forEach(select => select.selectedIndex = 0);

    const results = document.querySelectorAll("h2");

    results.forEach(result => result.innerHTML = "");

}

function copyResult(resultId) {

    let text = document.getElementById(resultId).innerText;

    if(text === ""){
        alert("Nothing to copy!");
        return;
    }

    navigator.clipboard.writeText(text);

    alert("✅ Result copied successfully!");
}

function saveHistory(resultId, text) {

    let history = document.getElementById("history");

    if (!history) return;

    if (history.innerHTML === "No calculations yet.") {
        history.innerHTML = "";
    }

    history.innerHTML =
        "• " + text + "<br>" + history.innerHTML;
}

function searchCalculators() {

    let input = document.getElementById("searchInput").value.toLowerCase();

    let cards = document.getElementsByClassName("calculator-card");

    for (let i = 0; i < cards.length; i++) {

        let text = cards[i].innerText.toLowerCase();

        if (text.includes(input)) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

window.onload = function () {

    let searchBox = document.getElementById("searchInput");

    if (searchBox) {
        searchBox.focus();
    }

    loadFavorites();

    if (document.getElementById("journalResult")) {
        displayTrades();
    }
    
    if (document.getElementById("totalTrades")) {
    updateDashboard();
}

};

function toggleFavorite(button) {

    let calculator = button.parentElement.querySelector("a").getAttribute("href");

    if (button.innerHTML === "☆") {
        button.innerHTML = "⭐";
        localStorage.setItem(calculator, "favorite");
    } else {
        button.innerHTML = "☆";
        localStorage.removeItem(calculator);
    }
}

function loadFavorites() {

    let buttons = document.querySelectorAll(".favorite-btn");

    buttons.forEach(function(button) {

        let calculator = button.parentElement
            .querySelector("a")
            .getAttribute("href");

        if (localStorage.getItem(calculator) === "favorite") {
            button.innerHTML = "⭐";
        }

    });

}

function saveTrade() {

    let date = document.getElementById("tradeDate").value;
    let pair = document.getElementById("pair").value;
    let type = document.getElementById("tradeType").value;
    let profit = Number(document.getElementById("profit").value);

    if (date === "" || pair === "" || isNaN(profit)) {
        document.getElementById("journalResult").innerHTML =
            "⚠️ Please complete all fields.";
        return;
    }

    let trades = JSON.parse(localStorage.getItem("tradeJournal")) || [];

    trades.unshift({
        date: date,
        pair: pair.toUpperCase(),
        type: type,
        profit: profit
    });

    localStorage.setItem("tradeJournal", JSON.stringify(trades));

    displayTrades();
}

let currentFilter = "all";

function displayTrades() {

    let trades = JSON.parse(localStorage.getItem("tradeJournal")) || [];

    let searchBox = document.getElementById("searchTrade");
    let search = searchBox ? searchBox.value.trim().toUpperCase() : "";

    let output = "";

    for (let i = 0; i < trades.length; i++) {

        let trade = trades[i];

        let matchesSearch =
            search === "" ||
            trade.pair.toUpperCase().includes(search) ||
            trade.type.toUpperCase().includes(search) ||
            trade.date.toUpperCase().includes(search);

        let matchesFilter =
            currentFilter === "all" ||
            (currentFilter === "win" && trade.profit > 0) ||
            (currentFilter === "loss" && trade.profit < 0);

        if (matchesSearch && matchesFilter) {

            output +=
                "📅 " + trade.date +
                " | 💱 " + trade.pair +
                " | " + trade.type +
                " | 💰 $" + trade.profit +
                "<br><br>";

        }

    }

    if (output === "") {
        output = "No matching trades found.";
    }

    document.getElementById("journalResult").innerHTML = output;

}
function searchTrades() {
    displayTrades();
}

function filterTrades(filter){

    currentFilter = filter;

    document.getElementById("allBtn").classList.remove("active");
    document.getElementById("winBtn").classList.remove("active");
    document.getElementById("lossBtn").classList.remove("active");

    if(filter==="all"){
        document.getElementById("allBtn").classList.add("active");
    }

    if(filter==="win"){
        document.getElementById("winBtn").classList.add("active");
    }

    if(filter==="loss"){
        document.getElementById("lossBtn").classList.add("active");
    }

    displayTrades();

}

function loadTradeJournal() {

    let history = localStorage.getItem("tradeJournal");

    if (history) {
        document.getElementById("journalResult").innerHTML = history;
    }

}

function clearJournal() {

    if (confirm("Are you sure you want to delete all saved trades?")) {

        localStorage.removeItem("tradeJournal");

        document.getElementById("journalResult").innerHTML =
            "No trades saved yet.";

    }

}

function updateDashboard() {

    let trades = JSON.parse(localStorage.getItem("tradeJournal")) || [];
    
    let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

let monthlyProfit = 0;
let monthlyTrades = 0;
let monthlyWins = 0;

    let totalTrades = trades.length;
    let winningTrades = 0;
    let losingTrades = 0;

    let totalProfit = 0;
    let totalLoss = 0;
    
    let currentWinStreak = 0;
    let currentLossStreak = 0;

    let longestWinStreak = 0;
    let longestLossStreak = 0;
    
    let winAmount = 0;
    let lossAmount = 0;

    let winCount = 0;
    let lossCount = 0;
    
    let largestWin = 0;
    let largestLoss = 0;
    
    let pairProfit = {};
    let dailyProfit = {};

    trades.forEach(function(trade) {
        
        let tradeDate = new Date(trade.date);

if (
    tradeDate.getMonth() === currentMonth &&
    tradeDate.getFullYear() === currentYear
) {

    monthlyTrades++;

    monthlyProfit += Number(trade.profit);

    if (trade.profit > 0) {
        monthlyWins++;
    }

}

    if (!pairProfit[trade.pair]) {
        pairProfit[trade.pair] = 0;
    }
        
        if (!dailyProfit[trade.date]) {
    dailyProfit[trade.date] = 0;
}

dailyProfit[trade.date] += trade.profit; 

    pairProfit[trade.pair] += trade.profit;
        
        if (trade.profit > 0) {

        winningTrades++;
            
            winAmount += trade.profit;
            winCount++;
        totalProfit += trade.profit;

        if (trade.profit > largestWin) {
            largestWin = trade.profit;
        }

    }
    else if (trade.profit < 0) {

        losingTrades++;
        
        lossAmount += Math.abs(trade.profit);
        lossCount++;
        
        totalLoss += Math.abs(trade.profit);

        if (Math.abs(trade.profit) > largestLoss) {
            largestLoss = Math.abs(trade.profit);
        }

    }
        
        if (trade.profit > 0) {

    currentWinStreak++;
    currentLossStreak = 0;

    if (currentWinStreak > longestWinStreak) {
        longestWinStreak = currentWinStreak;
    }

} else if (trade.profit < 0) {

    currentLossStreak++;
    currentWinStreak = 0;

    if (currentLossStreak > longestLossStreak) {
        longestLossStreak = currentLossStreak;
    }

}

});
    
    let avgWin = winCount === 0 ? 0 : winAmount / winCount;

let avgLoss = lossCount === 0 ? 0 : lossAmount / lossCount;
    
    let bestDay = "None";
let highestDayProfit = -Infinity;

for (let day in dailyProfit) {

    if (dailyProfit[day] > highestDayProfit) {
        highestDayProfit = dailyProfit[day];
        bestDay = day;
    }

}
    
    let worstDay = "None";
let lowestDayProfit = Infinity;

for (let day in dailyProfit) {

    if (dailyProfit[day] < lowestDayProfit) {
        lowestDayProfit = dailyProfit[day];
        worstDay = day;
    }

}
    
    let bestPair = "None";
    let highestProfit = -Infinity;

    for (let pair in pairProfit) {

    if (pairProfit[pair] > highestProfit) {

        highestProfit = pairProfit[pair];
        bestPair = pair;

    }

}

    let winRate = totalTrades === 0
        ? 0
        : (winningTrades / totalTrades) * 100;

    let netProfit = totalProfit - totalLoss;
    
    let dailyTarget = 500;
    
    let monthlyWinRate =
    monthlyTrades === 0
        ? 0
        : (monthlyWins / monthlyTrades) * 100;

document.getElementById("monthlyProfit").textContent =
"$" + monthlyProfit.toFixed(2);

document.getElementById("monthlyTrades").textContent =
monthlyTrades;

document.getElementById("monthlyWinRate").textContent =
monthlyWinRate.toFixed(1) + "%";

    document.getElementById("dailyGoal").textContent =
    "$" + netProfit.toFixed(2) + " / $" + dailyTarget.toFixed(2);

    document.getElementById("goalProgress").value =
    Math.max(0, Math.min(netProfit, dailyTarget));

    document.getElementById("totalTrades").textContent = totalTrades;
    document.getElementById("winningTrades").textContent = winningTrades;
    document.getElementById("losingTrades").textContent = losingTrades;
    document.getElementById("winRate").textContent =
        winRate.toFixed(1) + "%";

    document.getElementById("totalProfit").textContent =
        "$" + totalProfit.toFixed(2);

    document.getElementById("totalLoss").textContent =
        "$" + totalLoss.toFixed(2);

    document.getElementById("netProfit").textContent =
        "$" + netProfit.toFixed(2);
    
    document.getElementById("largestWin").textContent =
    "$" + largestWin.toFixed(2);

    document.getElementById("largestLoss").textContent =
    "$" + largestLoss.toFixed(2);
    
    document.getElementById("bestPair").textContent =
    bestPair + " ($" + highestProfit.toFixed(2) + ")";
    
    if (highestDayProfit === -Infinity) {
    document.getElementById("bestDay").textContent = "None";
} else {
    document.getElementById("bestDay").textContent =
        bestDay + " ($" + highestDayProfit.toFixed(2) + ")";
    
    if (lowestDayProfit === Infinity) {
    document.getElementById("worstDay").textContent = "None";
} else {
    document.getElementById("worstDay").textContent =
        worstDay + " ($" + lowestDayProfit.toFixed(2) + ")";
    
    document.getElementById("avgWin").textContent =
    "$" + avgWin.toFixed(2);

    document.getElementById("avgLoss").textContent =
    "$" + avgLoss.toFixed(2);
    
    document.getElementById("winStreak").textContent =
    longestWinStreak;

     document.getElementById("lossStreak").textContent =
    longestLossStreak;
}
}
}

function exportCSV() {

    let trades = JSON.parse(localStorage.getItem("tradeJournal")) || [];

    if (trades.length === 0) {
        alert("No trades to export.");
        return;
    }

    let csv = "Date,Pair,Type,Profit\n";

    trades.forEach(function(trade) {
        csv += trade.date + "," +
               trade.pair + "," +
               trade.type + "," +
               trade.profit + "\n";
    });

    let blob = new Blob([csv], { type: "text/csv" });

    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "TradeJournal.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}


const chartCanvas = document.getElementById("profitChart");

if (chartCanvas) {

    let trades = JSON.parse(localStorage.getItem("tradeJournal")) || [];

    let labels = [];
    let profits = [];
    let runningProfit = 0;

    trades.forEach(function(trade) {

        runningProfit += Number(trade.profit);

        labels.push(trade.date);

        profits.push(runningProfit);

    });

    new Chart(chartCanvas, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Cumulative Profit",
                data: profits,
                borderColor: "#0b3d91",
                backgroundColor: "rgba(11,61,145,0.2)",
                fill: true,
                tension: 0.3
            }]
        }
    });

}


function calculateCompounding() {

    let balance =
        Number(document.getElementById("startBalance").value);

    let percent =
        Number(document.getElementById("profitPercent").value);

    let trades =
        Number(document.getElementById("numberTrades").value);

    if (
        balance <= 0 ||
        percent <= 0 ||
        trades <= 0
    ) {

        document.getElementById("compoundResult").innerHTML =
        "⚠️ Please enter valid values.";

        return;
    }

    let currentBalance = balance;

    for (let i = 0; i < trades; i++) {

        currentBalance =
            currentBalance +
            (currentBalance * percent / 100);

    }

    let profit = currentBalance - balance;

    document.getElementById("compoundResult").innerHTML =
        "💰 Final Balance: $" +
        currentBalance.toFixed(2) +
        "<br><br>" +
        "📈 Total Profit: $" +
        profit.toFixed(2);

}

function calculateRiskOfRuin() {

    let winRate =
        Number(document.getElementById("winRate").value);

    let risk =
        Number(document.getElementById("riskTrade").value);

    let trades =
        Number(document.getElementById("tradeCount").value);

    if (
        winRate <= 0 ||
        risk <= 0 ||
        trades <= 0
    ) {

        document.getElementById("ruinResult").innerHTML =
        "⚠️ Please enter valid values.";

        return;

    }

    let lossRate = 100 - winRate;

    let probability =
        Math.pow(lossRate / 100, trades);

    let ruin =
        probability * (risk * trades);

    if (ruin > 100) ruin = 100;

    document.getElementById("ruinResult").innerHTML =
        "⚠️ Estimated Risk of Ruin<br><br>" +
        ruin.toFixed(2) + "%";

}

function calculateFibonacci() {

    let high =
        Number(document.getElementById("fibHigh").value);

    let low =
        Number(document.getElementById("fibLow").value);

    if (high <= low) {

        document.getElementById("fibResult").innerHTML =
        "⚠️ Swing High must be greater than Swing Low.";

        return;

    }

    let range = high - low;

    let fib236 = high - (range * 0.236);
    let fib382 = high - (range * 0.382);
    let fib500 = high - (range * 0.500);
    let fib618 = high - (range * 0.618);
    let fib786 = high - (range * 0.786);

    document.getElementById("fibResult").innerHTML =

    "<strong>Retracement Levels</strong><br><br>" +

    "23.6% = " + fib236.toFixed(5) + "<br>" +

    "38.2% = " + fib382.toFixed(5) + "<br>" +

    "50.0% = " + fib500.toFixed(5) + "<br>" +

    "61.8% = " + fib618.toFixed(5) + "<br>" +

    "78.6% = " + fib786.toFixed(5);

}

function calculateCurrencyStrength() {

    let currencies = {

        USD: Number(document.getElementById("usd").value),
        EUR: Number(document.getElementById("eur").value),
        GBP: Number(document.getElementById("gbp").value),
        JPY: Number(document.getElementById("jpy").value),
        CHF: Number(document.getElementById("chf").value),
        AUD: Number(document.getElementById("aud").value),
        NZD: Number(document.getElementById("nzd").value),
        CAD: Number(document.getElementById("cad").value)

    };

    let sorted = Object.entries(currencies)
        .sort((a, b) => b[1] - a[1]);

    let strongest = sorted[0][0];
    let weakest = sorted[sorted.length - 1][0];

    document.getElementById("currencyResult").innerHTML =

        "🥇 Strongest Currency: <b>" + strongest + "</b><br><br>" +

        "🔻 Weakest Currency: <b>" + weakest + "</b><br><br>" +

        "💡 Suggested Pair:<br>" +

        "<b>" + strongest + "/" + weakest + "</b>";

}

function checkTradingSession() {

    let now = new Date();

    let hour = now.getUTCHours();

    let session = "";

    if (hour >= 22 || hour < 7) {

        session =
        "🌏 Sydney Session\n🟢 OPEN";

    } else if (hour >= 0 && hour < 9) {

        session =
        "🗼 Tokyo Session\n🟢 OPEN";

    } else if (hour >= 8 && hour < 17) {

        session =
        "🇬🇧 London Session\n🟢 OPEN";

    } else if (hour >= 13 && hour < 22) {

        session =
        "🗽 New York Session\n🟢 OPEN";

    } else {

        session =
        "🔴 No major session active";

    }

    document.getElementById("sessionResult").innerHTML =
        session.replace("\n","<br><br>");

}

function calculateSpreadCost() {

    let lot =
        Number(document.getElementById("spreadLot").value);

    let spread =
        Number(document.getElementById("spreadPips").value);

    if (lot <= 0 || spread <= 0) {

        document.getElementById("spreadResult").innerHTML =
        "⚠️ Please enter valid values.";

        return;

    }

    let cost = lot * spread * 10;

    document.getElementById("spreadResult").innerHTML =

        "💰 Spread Cost<br><br>$" +
        cost.toFixed(2);

}

function calculatePipDifference() {

    let entry =
        Number(document.getElementById("pipEntry").value);

    let exit =
        Number(document.getElementById("pipExit").value);

    if (entry <= 0 || exit <= 0) {

        document.getElementById("pipDifferenceResult").innerHTML =
            "⚠️ Please enter valid prices.";

        return;
    }

    let difference = Math.abs(exit - entry);

    let pips = difference * 10000;

    document.getElementById("pipDifferenceResult").innerHTML =

        "📏 Pip Difference<br><br>" +

        pips.toFixed(1) + " Pips";

}

function calculateLeverage() {

    let balance =
        Number(document.getElementById("accountBalance").value);

    let position =
        Number(document.getElementById("positionValue").value);

    if (balance <= 0 || position <= 0) {

        document.getElementById("leverageResult").innerHTML =
            "⚠️ Please enter valid values.";

        return;
    }

    let leverage = position / balance;

    document.getElementById("leverageResult").innerHTML =

        "⚖️ Effective Leverage<br><br>1 : " +

        leverage.toFixed(2);

}

function calculateAccountGrowth() {

    let balance =
        Number(document.getElementById("startBalance").value);

    let growth =
        Number(document.getElementById("monthlyGrowth").value);

    let months =
        Number(document.getElementById("months").value);

    if (balance <= 0 || growth <= 0 || months <= 0) {

        document.getElementById("growthResult").innerHTML =
            "⚠️ Please enter valid values.";

        return;
    }

    let current = balance;

    let table =
        "<table border='1' width='100%' cellpadding='5'>" +
        "<tr><th>Month</th><th>Balance</th></tr>";

    for (let i = 1; i <= months; i++) {

        current += current * (growth / 100);

        table +=
            "<tr><td>" + i +
            "</td><td>$" +
            current.toFixed(2) +
            "</td></tr>";

    }

    table += "</table>";

    let profit = current - balance;

    document.getElementById("growthResult").innerHTML =

        "💰 Final Balance: $" +
        current.toFixed(2) +

        "<br><br>" +

        "📈 Total Profit: $" +
        profit.toFixed(2) +

        "<br><br>" +

        table;

}

function generateTradingPlan() {

    let balance =
        Number(document.getElementById("planBalance").value);

    let risk =
        Number(document.getElementById("planRisk").value);

    let stopLoss =
        Number(document.getElementById("planSL").value);

    let reward =
        Number(document.getElementById("planRR").value);

    if (
        balance <= 0 ||
        risk <= 0 ||
        stopLoss <= 0 ||
        reward <= 0
    ) {

        document.getElementById("planResult").innerHTML =
        "⚠️ Please enter valid values.";

        return;
    }

    let riskAmount =
        balance * risk / 100;

    let lotSize =
        riskAmount / (stopLoss * 10);

    let target =
        riskAmount * reward;

    document.getElementById("planResult").innerHTML =

        "<strong>📋 Trading Plan</strong><br><br>" +

        "💰 Risk Amount: $" +
        riskAmount.toFixed(2) +

        "<br><br>" +

        "📊 Recommended Lot Size: " +
        lotSize.toFixed(2) +

        "<br><br>" +

        "🎯 Profit Target: $" +
        target.toFixed(2);

}

function updateMarketStatus(){

let hour = new Date().getUTCHours();

document.getElementById("londonStatus").innerHTML =
(hour>=8 && hour<17) ? "🟢 OPEN" : "🔴 CLOSED";

document.getElementById("newyorkStatus").innerHTML =
(hour>=13 && hour<22) ? "🟢 OPEN" : "🔴 CLOSED";

document.getElementById("tokyoStatus").innerHTML =
(hour>=0 && hour<9) ? "🟢 OPEN" : "🔴 CLOSED";

document.getElementById("sydneyStatus").innerHTML =
(hour>=22 || hour<7) ? "🟢 OPEN" : "🔴 CLOSED";

}

updateMarketStatus();

function topFunction(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

window.addEventListener("load",function(){

setTimeout(function(){

document.getElementById("loader").classList.add("hidden");

},1000);

});

function loadForexNews(){

let news=[

"📈 Gold rises as US Dollar weakens",

"💵 Federal Reserve signals possible rate cut",

"🇪🇺 EUR/USD gains after ECB announcement",

"🛢️ Oil prices climb on supply concerns",

"🇯🇵 Yen strengthens during Asian session"

];

let html="";

news.forEach(item=>{

html+="<li>"+item+"</li>";

});

document.getElementById("newsList").innerHTML=html;

}

if(document.getElementById("newsList")){

loadForexNews();

}

function updateGoldTracker(){

const now = new Date();

document.getElementById("goldTime").innerHTML =
now.toLocaleTimeString();

}

if(document.getElementById("goldTime")){

updateGoldTracker();

setInterval(updateGoldTracker,1000);

}

function askAI(){

let q=document.getElementById("question").value.toLowerCase();

let answer="";

if(q.includes("risk")){

answer="Never risk more than 1–2% of your account on a single trade.";

}

else if(q.includes("lot")){

answer="Use the Lot Size Calculator to determine the correct position size.";

}

else if(q.includes("gold")){

answer="Gold (XAU/USD) is most active during the London and New York sessions.";

}

else if(q.includes("session")){

answer="The London–New York overlap usually has the highest trading volume.";

}

else if(q.includes("stop loss")){

answer="Always place a stop-loss before entering a trade to help manage risk.";

}

else{

answer="I'm still learning. More AI features will be added in Version 3.0.";

}

document.getElementById("answer").innerHTML=answer;

}

function loadChart(pair){

document.getElementById("chartTitle").innerHTML = pair;

document.getElementById("chartArea").innerHTML =

"📈 Interactive chart for " + pair +
"<br><br>(Live charts will be connected in a future update.)";

}

function saveAlert(){

let pair=document.getElementById("pair").value;

let price=document.getElementById("targetPrice").value;

if(price===""){

document.getElementById("alertMessage").innerHTML=

"⚠️ Please enter a target price.";

return;

}

document.getElementById("alertMessage").innerHTML=

"✅ Alert saved for "+pair+" at "+price;

}
function saveProfile(){

let name=document.getElementById("userName").value;

if(name===""){

alert("Please enter your name.");

return;

}

localStorage.setItem("forexUser",name);

document.getElementById("welcome").innerHTML=

"Welcome back, "+name+"! 👋";

}

window.addEventListener("load",function(){

if(document.getElementById("welcome")){

let saved=localStorage.getItem("forexUser");

if(saved){

document.getElementById("welcome").innerHTML=

"Welcome back, "+saved+"! 👋";

}

}

});


function loadMarketScanner(){

let summary=[

"🟢 USD remains the strongest major currency.",

"🔴 NZD shows relative weakness.",

"🥇 Gold is trading in a bullish trend.",

"📈 Watch USD/JPY for potential opportunities.",

"⚠️ Check today's Economic Calendar before trading."

];

let html="";

summary.forEach(function(item){

html+="<li>"+item+"</li>";

});

if(document.getElementById("marketSummary")){

document.getElementById("marketSummary").innerHTML=html;

}

}

window.addEventListener("load",function(){

loadMarketScanner();

});

function calculateCryptoProfit(){
    let coin=document.getElementById("coin").value;

let buy=parseFloat(document.getElementById("buyPrice").value);
let sell=parseFloat(document.getElementById("sellPrice").value);
let qty=parseFloat(document.getElementById("quantity").value);

if(isNaN(buy)||isNaN(sell)||isNaN(qty)||qty<=0){

document.getElementById("cryptoResult").innerHTML=
"⚠️ Please enter valid values.";

return;

}

let profit=(sell-buy)*qty;

let result=profit>=0?
"✅ Profit: $"+profit.toFixed(2):
"🔻 Loss: $"+Math.abs(profit).toFixed(2);

document.getElementById("cryptoResult").innerHTML=

coin+"<br><br>"+result;
}

function resetCryptoProfit(){

document.getElementById("buyPrice").value="";
document.getElementById("sellPrice").value="";
document.getElementById("quantity").value="";
document.getElementById("cryptoResult").innerHTML="";

}

const cryptoPrices={

"₿ Bitcoin (BTC)":118450.25,
"Ξ Ethereum (ETH)":3850.70,
"◎ Solana (SOL)":210.35,
"🟡 BNB (BNB)":845.60,
"✕ XRP (XRP)":3.15,
"₳ Cardano (ADA)":1.08,
"🐕 Dogecoin (DOGE)":0.29,
"🔺 Avalanche (AVAX)":42.80,
"⛓️ Chainlink (LINK)":24.65,
"🔷 Polygon (POL)":0.74

};

function updateCryptoPrice() {

    let coin = document.getElementById("coin").value;

    document.getElementById("selectedCoin").textContent = coin;

    if (cryptoPrices[coin] !== undefined) {

        document.getElementById("liveCryptoPrice").textContent =
            "$" + cryptoPrices[coin].toLocaleString();

    } else {

        document.getElementById("liveCryptoPrice").textContent =
            "Price not available";

    }

}

window.addEventListener("load", function () {

    if (document.getElementById("coin")) {

        updateCryptoPrice();

        document.getElementById("coin").addEventListener("change", updateCryptoPrice);

    }

});

function calculateDCA(){

let p1=parseFloat(document.getElementById("price1").value);
let a1=parseFloat(document.getElementById("amount1").value);
let p2=parseFloat(document.getElementById("price2").value);
let a2=parseFloat(document.getElementById("amount2").value);

if(isNaN(p1)||isNaN(a1)||isNaN(p2)||isNaN(a2)){

document.getElementById("dcaResult").innerHTML=
"⚠️ Please enter all values.";

return;

}

let coins1=a1/p1;
let coins2=a2/p2;

let totalCoins=coins1+coins2;
let totalInvestment=a1+a2;

let averagePrice=totalInvestment/totalCoins;

document.getElementById("dcaResult").innerHTML=

"Average Buy Price: $"+averagePrice.toFixed(2)+
"<br>Total Coins: "+totalCoins.toFixed(6);

}

function resetDCA(){

document.getElementById("price1").value="";
document.getElementById("amount1").value="";
document.getElementById("price2").value="";
document.getElementById("amount2").value="";
document.getElementById("dcaResult").innerHTML="";

}

function calculateCryptoPosition(){

let balance=parseFloat(document.getElementById("balance").value);
let risk=parseFloat(document.getElementById("risk").value);
let stop=parseFloat(document.getElementById("stopLoss").value);

if(isNaN(balance)||isNaN(risk)||isNaN(stop)||stop<=0){

document.getElementById("positionResult").innerHTML=
"⚠️ Please enter valid values.";

return;

}

let riskAmount=(balance*risk)/100;

let position=riskAmount/stop;

document.getElementById("positionResult").innerHTML=
"Recommended Position Size: "+position.toFixed(6)+" coins";

}

function resetCryptoPosition(){

document.getElementById("balance").value="";
document.getElementById("risk").value="";
document.getElementById("stopLoss").value="";
document.getElementById("positionResult").innerHTML="";

}

function calculateLiquidation(){

let entry=parseFloat(document.getElementById("entryPrice").value);
let leverage=parseFloat(document.getElementById("leverage").value);

if(isNaN(entry)||isNaN(leverage)||leverage<=0){

document.getElementById("liquidationResult").innerHTML=
"⚠️ Please enter valid values.";

return;

}

let liquidation=entry-(entry/leverage);

document.getElementById("liquidationResult").innerHTML=

"Estimated Liquidation Price: $"+
liquidation.toFixed(2);

}

function resetLiquidation(){

document.getElementById("entryPrice").value="";
document.getElementById("leverage").value="";
document.getElementById("liquidationResult").innerHTML="";

}

function calculateStaking(){

let amount=parseFloat(document.getElementById("stakeAmount").value);
let apy=parseFloat(document.getElementById("apy").value);
let years=parseFloat(document.getElementById("years").value);

if(isNaN(amount)||isNaN(apy)||isNaN(years)||amount<=0){

document.getElementById("stakingResult").innerHTML=
"⚠️ Please enter valid values.";

return;

}

let reward=amount*(apy/100)*years;

let total=amount+reward;

document.getElementById("stakingResult").innerHTML=

"Estimated Reward: "+reward.toFixed(2)+
"<br>Total After Staking: "+total.toFixed(2);

}

function resetStaking(){

document.getElementById("stakeAmount").value="";
document.getElementById("apy").value="";
document.getElementById("years").value="";
document.getElementById("stakingResult").innerHTML="";

}

function calculatePortfolio(){

let coin=document.getElementById("portfolioCoin").value;
let qty=parseFloat(document.getElementById("portfolioQty").value);
let price=parseFloat(document.getElementById("portfolioPrice").value);

if(isNaN(qty)||isNaN(price)||qty<=0){

document.getElementById("portfolioResult").innerHTML=
"⚠️ Please enter valid values.";

return;

}

let value=qty*price;

document.getElementById("portfolioResult").innerHTML=

"💼 "+coin+
"<br><br>Total Portfolio Value: $"+
value.toLocaleString(undefined,{
minimumFractionDigits:2,
maximumFractionDigits:2
});

}

function resetPortfolio(){

document.getElementById("portfolioQty").value="";
document.getElementById("portfolioPrice").value="";
document.getElementById("portfolioResult").innerHTML="";

}

function calculateROI(){

let coin=document.getElementById("roiCoin").value;

let investment=parseFloat(document.getElementById("investment").value);

let current=parseFloat(document.getElementById("currentValue").value);

if(isNaN(investment)||isNaN(current)||investment<=0){

document.getElementById("roiResult").innerHTML=
"⚠️ Please enter valid values.";

return;

}

let profit=current-investment;

let roi=(profit/investment)*100;

let color=profit>=0?"green":"red";

let icon=profit>=0?"📈":"📉";

document.getElementById("roiResult").innerHTML=

"<strong>"+coin+"</strong><br><br>"+

icon+" Profit/Loss: <span style='color:"+color+";'>$"+
profit.toFixed(2)+"</span><br>"+

"ROI: <span style='color:"+color+";'>"+
roi.toFixed(2)+"%</span>";

}

function resetROI(){

document.getElementById("investment").value="";
document.getElementById("currentValue").value="";
document.getElementById("roiResult").innerHTML="";

}

function calculateStockProfit(){

let buy=parseFloat(document.getElementById("buyPrice").value);
let sell=parseFloat(document.getElementById("sellPrice").value);
let shares=parseFloat(document.getElementById("shares").value);

if(isNaN(buy)||isNaN(sell)||isNaN(shares)||shares<=0){

document.getElementById("stockResult").innerHTML=
"⚠️ Please enter valid values.";

return;

}

let profit=(sell-buy)*shares;

let text=profit>=0?
"✅ Profit: $"+profit.toFixed(2):
"📉 Loss: $"+Math.abs(profit).toFixed(2);

document.getElementById("stockResult").innerHTML=text;

}

function resetStockProfit(){

document.getElementById("buyPrice").value="";
document.getElementById("sellPrice").value="";
document.getElementById("shares").value="";
document.getElementById("stockResult").innerHTML="";

}

function calculateDividend(){

let stock=document.getElementById("stockName").value;

let shares=parseFloat(document.getElementById("shares").value);

let dividend=parseFloat(document.getElementById("dividend").value);

if(stock===""||isNaN(shares)||isNaN(dividend)||shares<=0){

document.getElementById("dividendResult").innerHTML=
"⚠️ Please enter valid values.";

return;

}

let income=shares*dividend;

document.getElementById("dividendResult").innerHTML=

"📈 "+stock+

"<br><br>Estimated Dividend Income: $"+

income.toFixed(2);

}

function resetDividend(){

document.getElementById("stockName").value="";
document.getElementById("shares").value="";
document.getElementById("dividend").value="";
document.getElementById("dividendResult").innerHTML="";

}