const WTF = [
    "The number of lines of code on GitHub is directly proportional to the number of dreams crushed by bugs.",
    "On GitHub, the more lines of code you write, the closer you get to your next existential crisis.",
    "Every line of code on GitHub is a reminder: progress is just a fancy term for more problems.",
    "In the world of coding, every line is a step toward enlightenment… or eternal frustration.",
    "GitHub: where lines of code pile up like unpaid debts, and the interest is pure chaos.",
    "Every line of code is a ticking time bomb, just waiting to explode when you least expect it.",
    "The number of lines of code is like a graveyard: each one marks a piece of lost sanity.",
    "On GitHub, every new line of code is a silent scream for help.",
    "Your lines of code on GitHub are like ghosts—haunting you long after you've forgotten their purpose.",
    "In the coding world, more lines equal more shadows lurking in your project's future.",
    "In the coding world, every 'Hello, World!' is just a reminder of how far we are from the end.",
    "Debugging: where you turn coffee into code, and sanity into despair.",
    "Your code's like a horror movie: it starts off promising, but ends with a lot of screaming.",
    "Every time I push code, a bug gets its wings—just waiting to fly into production.",
    "The only thing scarier than your code is the thought of reading your own documentation.",
    "In the realm of coding, every new feature is just a Pandora's box waiting to be opened.",
    "Commit messages on GitHub: where you lie about what really happened.",
    "Your code may be elegant, but just wait until it meets a real user—then the chaos begins.",
    "In software development, every deployment is just a game of Russian roulette.",
    "The only thing worse than your code is the silence of your users after a major release.",
    "Coding is like a relationship: it starts with passion but often ends in debugging.",
    "The best part of coding? It’s always the last line—right before you crash and burn.",
    "On GitHub, every commit is just a tombstone for another feature that didn’t survive.",
    "Every time you refactor, just remember: some bugs were meant to be left alone.",
    "Your code is like a bad horror movie—full of jump scares and plot holes.",
    "In programming, success is just the calm before the storm of unforeseen bugs.",
    "They say love is blind; in coding, it's just a compiler error waiting to be revealed.",
    "Your GitHub repo is the dark web of your coding journey—hidden secrets and regrets galore.",
    "Writing code is like burying your secrets; eventually, they’ll come back to haunt you.",
    "The only thing more elusive than a bug fix is the praise from your boss after a release."
];

randomWhatTheFuck = Math.floor(Math.random()*WTF.length)
let doneCounter = localStorage.getItem('doneCounter') ? localStorage.getItem('doneCounter') : 0;
let WTFCounter = sessionStorage.getItem('WTFCounter') ? sessionStorage.getItem('WTFCounter') : 1;

window.addEventListener('load', function() {
    WTFCounter = parseInt(WTFCounter)+1
    this.sessionStorage.setItem('WTFCounter',WTFCounter)
    if(WTFCounter%10 != 0 || WTFCounter == 1 || doneCounter == 1){
        document.getElementById("dataShowInfo").innerHTML = WTF[randomWhatTheFuck]
        document.getElementById("dataShowInfo").style.padding = "0"
        document.getElementById("dataShowInfo").style.backgroundColor = "transparent"
        document.getElementById("dataShowInfo").style.boxShadow = "none"
        document.getElementById("dataShowInfo").style.color = "#000000"
        document.getElementById("dataShowInfo").style.fontWeight = "normal"
    } else if(WTFCounter == 10 && doneCounter == 0) {
        document.getElementById("dataShowInfo").innerHTML = "Are you here to only read jokes, You fuckin Dumbass."
        document.getElementById("dataShowInfo").style.backgroundColor = "#c6bcad"
        document.getElementById("dataShowInfo").style.boxShadow = "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
        document.getElementById("dataShowInfo").style.color = "#171717"
        document.getElementById("dataShowInfo").style.fontWeight = "bold"
    } else if(WTFCounter == 20 && doneCounter == 0) {
        document.getElementById("dataShowInfo").innerHTML = "Really? You are Still doing this!"
        document.getElementById("dataShowInfo").style.backgroundColor = "#c6bcad"
        document.getElementById("dataShowInfo").style.boxShadow = "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
        document.getElementById("dataShowInfo").style.color = "#171717"
        document.getElementById("dataShowInfo").style.fontWeight = "bold"
    } else if(WTFCounter == 30 && doneCounter == 0) {
        document.getElementById("dataShowInfo").innerHTML = "If you didn't see any repeated then stop, I had only added 30."
        document.getElementById("dataShowInfo").style.backgroundColor = "#c6bcad"
        document.getElementById("dataShowInfo").style.boxShadow = "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
        document.getElementById("dataShowInfo").style.color = "#171717"
        document.getElementById("dataShowInfo").style.fontWeight = "bold"
        doneCounter = 1
        this.localStorage.setItem('doneCounter',doneCounter)
    }
});



/* ------------- PRESS-ENTER ------------- */

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const button = document.getElementById('submit');
        let dataN = document.getElementById('username').value
        if ((button) && (dataN)) {
            button.click();
        }
    }
});



/* ------------- WRITE-DATA ------------- */

const submitButton = document.getElementById('submit');
const resultDiv = document.getElementById('result');
const loadingDiv = document.getElementById('loading');
const textChangeCheckbox = document.getElementById('textChange');
let chart;
let totalLinesGlobal = 0;
let userAvatarUrl = '';

submitButton.addEventListener('click', fetchUserStats);
textChangeCheckbox.addEventListener('change', updateTotalLinesDisplay);

function formatNumber(num) {
    if (textChangeCheckbox.checked) {
        const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", "Vg"];
        const order = Math.floor(Math.log10(num) / 3);
        if (order < suffixes.length) {
            const suffix = suffixes[order];
            const scaled = num / Math.pow(10, order * 3);
            // return scaled.toFixed(1).replace(/\.0$/, '') + suffix;
            return (Math.floor(scaled * 10) / 10).toString() + suffix;
        }
        return num.toExponential(2);
    } else {
        return num.toLocaleString();
    }
}

async function updateTotalLinesDisplay() {
    const formattedLines = formatNumber(totalLinesGlobal);
    const username = document.getElementById('username').value;

    let totalLinesElement = document.querySelector('#result h2');
    if (!totalLinesElement) {
        totalLinesElement = document.createElement('h2');
        document.getElementById('result').appendChild(totalLinesElement);
    }
    totalLinesElement.textContent = `Total Commits: ${formattedLines}`;

    let avatarElement = document.querySelector('#resultUser img');
    if (!avatarElement) {
        avatarElement = document.createElement('img');
        document.getElementById('resultUser').prepend(avatarElement);
    }
    
    try {
        const response = await fetch(userAvatarUrl);
        const blob = await response.blob();
        const dataUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
        avatarElement.src = dataUrl;
    } catch (error) {
        console.error('Error converting avatar to data URL:', error);
        avatarElement.src = '';
    }

    avatarElement.alt = `${username}'s avatar`;
    avatarElement.style.cssText = 'width: 350px; height: 350px; margin: 0.5em 0 0.5em 0; display: inline-block;';

    let usernameElement = document.querySelector('#resultUser h2');
    if (!usernameElement) {
        usernameElement = document.createElement('h2');
        document.getElementById('resultUser').appendChild(usernameElement);
    }
    usernameElement.textContent = username;

    let criminalStatusElement = document.querySelector('#resultUser h2:nth-child(3)');
    if (!criminalStatusElement) {
        criminalStatusElement = document.createElement('h2');
        document.getElementById('resultUser').appendChild(criminalStatusElement);
    }

    let criminalStatus;
    if (totalLinesGlobal == 0){
        criminalStatus = "Law-abiding Bitch!";
    } else if (totalLinesGlobal < 500) {
        criminalStatus = "Petty Criminal";
    } else if (totalLinesGlobal < 1000) {
        criminalStatus = "White Collar Criminal";
    } else if (totalLinesGlobal < 2000) {
        criminalStatus = "Career Criminal";
    } else if (totalLinesGlobal < 5000) {
        criminalStatus = "Violent Criminal";
    } else {
        criminalStatus = "Most Wanted";
    }
    criminalStatusElement.textContent = criminalStatus;

    async function getGitHubSignupDate(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return new Date(data.created_at);
        } catch (error) {
            console.error("Error fetching GitHub user data:", error);
            return null;
        }
    }

    getGitHubSignupDate(username).then(date => {
        if (date) {
            let criminalBornElement = document.querySelector('#resultUser p');
            if (!criminalBornElement) {
                criminalBornElement = document.createElement('p');
                document.getElementById('resultUser').appendChild(criminalBornElement);
            }
            // document.getElementById('firstCrimeDate').innerHTML = date.toLocaleDateString()
            criminalBornElement.innerHTML = "Criminal Activities Since: " + date.toLocaleDateString()
        } else {
            console.log("Couldn't retrieve signup date");
        }
    });


    const userDataElement = document.getElementById('userData');
    if (userDataElement) {
        userDataElement.style.display = "flex";
    }

    const resultUserElement = document.getElementById('resultUser');
    if (resultUserElement) {
        resultUserElement.style.cssText = 'display: flex; flex-direction: column; align-items: center;';
    }

    document.getElementById('container').style.pointerEvents = 'auto';
    document.getElementById('container').style.display = 'block';
    document.getElementById('container').style.opacity = 1;
    document.getElementById('containerHideLabel').style.pointerEvents = 'auto';
    document.getElementById('containerHideLabel').style.visibility = 'visible';
    document.getElementById('containerHideLabel').style.opacity = 1;
    document.getElementById('containerWeaponStats').style.pointerEvents = 'auto';
    document.getElementById('containerWeaponStats').style.visibility = 'visible';
    document.getElementById('containerWeaponStats').style.opacity = 1;
    document.getElementById('share').style.opacity = 1;
    document.getElementById('result').style.display = 'flex';
    document.getElementById('share').style.pointerEvents = 'auto';
}



/* ------------- GET-DATA ------------- */

async function fetchUserStats() {
    document.getElementById("hideLabels").checked = false;
    const username = document.getElementById('username').value;
    if (!username) {
        return;
    }
    document.getElementById("dataShowInfo").style.padding = "0"
    document.getElementById("dataShowInfo").style.display = "flex"
    document.getElementById("dataShowInfo").style.backgroundColor = "transparent"
    document.getElementById("dataShowInfo").style.boxShadow = "none"
    document.getElementById("dataShowInfo").style.color = "#000000"
    document.getElementById("dataShowInfo").style.fontWeight = "normal"
    if(window.innerWidth>1300){
        document.getElementById("dataShowInfo").style.marginTop = "6em"
    } else {
        document.getElementById("dataShowInfo").style.marginTop = "2em"
    }
    const WTFintervalId = setInterval(() => {
        randomWhatTheFuck = Math.floor(Math.random()*WTF.length)
        document.getElementById("dataShowInfo").innerHTML = WTF[randomWhatTheFuck]
    }, 3500);
    loadingDiv.style.display = 'flex';
    document.getElementById('result').style.display = 'none';
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('userData').style.display = 'none';
    document.getElementById('share').style.pointerEvents = 'none';
    document.getElementById('container').style.display = 'none';
    document.getElementById('container').style.pointerEvents = 'none';
    document.getElementById('container').style.opacity = 0.5;
    document.getElementById('containerHideLabel').style.visibility = 'hidden';
    document.getElementById('containerHideLabel').style.pointerEvents = 'none';
    document.getElementById('containerHideLabel').style.opacity = 0.5;
    document.getElementById('containerWeaponStats').style.visibility = 'hidden';
    document.getElementById('containerWeaponStats').style.pointerEvents = 'none';
    document.getElementById('containerWeaponStats').style.opacity = 0.5;
    document.getElementById('share').style.opacity = 0.5;
    resultDiv.innerHTML = '';
    if (chart) {
        chart.dispose();
    }
    try {
        const response = await fetch(`https://github-stats-worker.gdata85416.workers.dev/${username}`);
    
        if (!response.ok) {
            if (response.status === 429) {
                throw new Error('GITHUB_RATE_LIMIT');
            } else if (response.status === 403) {
                throw new Error('CLOUDFLARE_RATE_LIMIT');
            } else if (response.status === 404) {
                throw new Error('USER_NOT_FOUND');
            }
            throw new Error('USER_NOT_FOUND');
        }
    
        const data = await response.json();
        const userData = data.user;
        const repos = data.repos;
        userAvatarUrl = userData.avatarUrl;
        totalLinesGlobal = data.commitTotal;
        await updateTotalLinesDisplay();

        const showLanguagesCheckbox = document.getElementById('weaponStats');

        const formattedDate = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        }).replace(/\//g, '');
        const newNum = formattedDate + Math.floor(Math.random() * 1000) + 1

        function handleCheckboxChange() {
            const showLanguages = showLanguagesCheckbox.checked;
            let weapons = false;
            document.getElementById("hideLabels").checked = false;

            if (showLanguages && data.languageStats?.percentages) {

                const totalPercentage = 100;
                const languageBreakdown = {};
                Object.entries(data.languageStats.percentages)
                    .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]))
                    .forEach(([language, percentage]) => {
                        languageBreakdown[language] = parseFloat(percentage);
                    });

                displayResults(totalPercentage, languageBreakdown, weapons, newNum);
            } else {
                weapons = true
                displayResults(data.commitTotal, data.totalRepoCommit, weapons, newNum);
            }
        }

        showLanguagesCheckbox.addEventListener('change', handleCheckboxChange);
        handleCheckboxChange();

    
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
        document.getElementById('errorMsg').style.display = 'block';
        switch(error.message) {
            case 'GITHUB_RATE_LIMIT':
                document.getElementById('errorMsg').innerHTML = 'GitHub API rate limit exceeded! Please try again in an hour. 🕒';
                break;
            case 'CLOUDFLARE_RATE_LIMIT':
                document.getElementById('errorMsg').innerHTML = 'Daily request limit reached! Please try again after midnight UTC. ⏳';
                break;
            case 'USER_NOT_FOUND':
                document.getElementById('errorMsg').innerHTML = 'USER DOES NOT EXIST!';
                break;
            default:
                document.getElementById('errorMsg').innerHTML = 'Something went wrong! Please try again later.';
        }
    } finally {
        loadingDiv.style.display = 'none';
        document.getElementById('dataShowInfo').style.display = 'none';
        document.getElementById("dataShowInfo").innerHTML = WTF[randomWhatTheFuck];
        clearInterval(WTFintervalId);
    }
}



/* ------------- CHART[AMCHART] ------------- */

function displayResults(totalLines, languages, weapons, susID) {
    const formattedLines = formatNumber(totalLines);
    if(weapons == true){
        resultDiv.innerHTML = `<h2>Total Commits: ${formattedLines}</h2>`;
    } else {
        resultDiv.innerHTML = `<h2>Weapons Used</h2>`;
    }

    let languagePercentages = Object.entries(languages).map(([lang, lines]) => {
        const percentage = (lines / totalLines) * 100;
        return { language: lang, value: percentage };
    }).sort((a, b) => b.value - a.value);

    const threshold = 1;
    let otherPercentage = 0;
    languagePercentages = languagePercentages.filter(lang => {
        if (lang.value < threshold) {
            otherPercentage += lang.value;
            return false;
        }
        return true;
    });

    if (otherPercentage > 0) {
        languagePercentages.push({ language: "Other", value: otherPercentage });
    }

    languagePercentages.sort((a, b) => b.value - a.value);

    if (chart) {
        chart.dispose();
    }

    chart = am5.Root.new("chartdiv");

    chart.setThemes([am5themes_Animated.new(chart)]);

    chart.container.children.push(am5.Rectangle.new(chart, {
        fillOpacity: 1,
        tooltipY: 0,
        width: am5.percent(100),
        height: am5.percent(100)
    }));

    const pieChart = chart.container.children.push(
        am5percent.PieChart.new(chart, {
            layout: chart.verticalLayout
        })
    );

    const series = pieChart.series.push(
        am5percent.PieSeries.new(chart, {
            valueField: "value",
            categoryField: "language"
        })
    );

    series.set("tooltip", am5.Tooltip.new(chart, {
        labelText: "{category}: [bold]{value.formatNumber('#.0')}%[/]"
    }));

    series.get("tooltip").label.setAll({
        fontFamily: "Space Mono",
        fontSize: 14,
    });

    series.data.setAll(languagePercentages);

    series.labels.template.setAll({
        fontFamily: "Space Mono",
        fontSize: 0,
        text: "{category}: {value.formatNumber('#.0')}%",
        fill: am5.color("#000000")
    });

    series.ticks.template.setAll({
        forceHidden: false
    });

    const labelHideCheckbox = document.getElementById('hideLabels');
    labelHideCheckbox.addEventListener('change', hideLabels);

    function hideLabels(){
        if(labelHideCheckbox.checked){
            series.labels.template.setAll({
                visible: false
            });
            series.ticks.template.setAll({
                forceHidden: true
            });
        } else {
            series.labels.template.setAll({
                visible: true
            });
            series.ticks.template.setAll({
                forceHidden: false
            });
        }
    }

    const legend = pieChart.children.push(am5.Legend.new(chart, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15
    }));

    legend.labels.template.setAll({
        fontFamily: "Space Mono",
        fill: am5.color("#000000"),
        fontSize: 12
    });

    legend.valueLabels.template.setAll({
        fontFamily: "Space Mono",
        fill: am5.color("#000000"),
        fontSize: 12
    });

    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);

    const exporting = am5plugins_exporting.Exporting.new(chart, {
        menu: am5plugins_exporting.ExportingMenu.new(chart, {}),
        filePrefix: "github-language-stats",
        dataSource: pieChart.series.values[0].data.values,
        pngOptions: {
            quality: 0.7,
            maintainPixelRatio: true,
            backgroundColor: am5.color(0x000000)
        }
    });



    /* ------------- COPY-IMAGE ------------- */

    const shareButton = document.querySelector('.shareOnSocial');
    shareButton.addEventListener('click', async () => {
        event.preventDefault();
    
        shareButton.innerHTML = 'Processing..';
        shareButton.style.backgroundColor = 'rgb(218, 204, 162, 0.5)';
        shareButton.style.border = '1px solid rgb(218, 204, 162, 0.5)';
        shareButton.style.pointerEvents = 'none';
    
        // Add event listener to prevent paste reload
        document.addEventListener('paste', (e) => {
            e.preventDefault();
        }, { once: true });

    const orgDiv = document.getElementById("chartContainer");

    const clonedDiv = document.getElementById("clonedDiv");
    clonedDiv.innerHTML = '';
    const clonedChart = orgDiv.cloneNode(true);
    clonedDiv.appendChild(clonedChart);

    const labelContainer = clonedDiv.querySelector("label#container");
    const labelContainerHideLabel = clonedDiv.querySelector("label#containerHideLabel");
    const labelWeaponStats = clonedDiv.querySelector("label#containerWeaponStats");
    const dataShowInfo = clonedDiv.querySelector("p#dataShowInfo");
    const loadingDiv = clonedDiv.querySelector("div#loading");

    if (labelContainer) labelContainer.remove();
    if (labelContainerHideLabel) labelContainerHideLabel.remove();
    if (labelWeaponStats) labelWeaponStats.remove();
    if (dataShowInfo) dataShowInfo.remove();
    if (loadingDiv) loadingDiv.remove();

    // const formattedDate = new Date().toLocaleDateString('en-US', { 
    //     year: 'numeric', 
    //     month: '2-digit', 
    //     day: '2-digit' 
    // }).replace(/\//g, '');

    // const newNum = formattedDate + Math.floor(Math.random() * 1000) + 1

    const h1 = document.createElement("h1")
    h1.textContent = "#SuspectID: " + susID

    clonedDiv.prepend(h1)

    const chartDivInClone = clonedDiv.querySelector("#chartdiv");
    if (chartDivInClone) {
        chartDivInClone.remove();
    }

    const newChartDiv = document.createElement("div");
    newChartDiv.id = "chartdivClone";
    newChartDiv.style.width = "100%";
    newChartDiv.style.height = "100%";

    clonedDiv.querySelector(".chartData").appendChild(newChartDiv);

    let chartClone;
    if (chartClone) {
        chartClone.dispose();
    }

    chartClone = am5.Root.new("chartdivClone");

    chartClone.setThemes([am5themes_Animated.new(chartClone)]);

    chartClone.container.children.push(am5.Rectangle.new(chartClone, {
        fillOpacity: 1,
        tooltipY: 0,
        width: am5.percent(100),
        height: am5.percent(100)
    }));

    const pieChartClone = chartClone.container.children.push(
        am5percent.PieChart.new(chartClone, {
            layout: chartClone.verticalLayout
        })
    );

    const series = pieChartClone.series.push(
        am5percent.PieSeries.new(chartClone, {
            valueField: "value",
            categoryField: "language"
        })
    );

    series.set("tooltip", am5.Tooltip.new(chartClone, {
        labelText: "{category}: [bold]{value.formatNumber('#.0')}%[/]"
    }));

    series.get("tooltip").label.setAll({
        fontFamily: "Space Mono",
        fontSize: 14,
    });

    series.data.setAll(languagePercentages);

    series.labels.template.setAll({
        fontFamily: "Space Mono",
        fontSize: 12,
        text: "{category}: {value.formatNumber('#.0')}%",
        fill: am5.color("#000000")
    });

    series.ticks.template.setAll({
        forceHidden: true
    });

    const legend = pieChartClone.children.push(am5.Legend.new(chartClone, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15
    }));

    legend.labels.template.setAll({
        fontFamily: "Space Mono",
        fill: am5.color("#000000"),
        fontSize: 12
    });

    legend.valueLabels.template.setAll({
        fontFamily: "Space Mono",
        fill: am5.color("#000000"),
        fontSize: 12
    });

    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);

    setTimeout(async () => {
        try {
            const canvas = await html2canvas(clonedDiv, {
                useCORS: true,
                allowTaint: true,
            });

            canvas.toBlob(async (blob) => {
                const item = new ClipboardItem({ "image/png": blob });
                await navigator.clipboard.write([item]);

                shareButton.innerHTML = 'Image Copied to Clipboard!';
                setTimeout(() => {
                    shareButton.innerHTML = 'Copy Image';
                    shareButton.style.backgroundColor = 'rgb(218, 204, 162)';
                    shareButton.style.pointerEvents = 'auto';
                }, 3000);
            }, 'image/png');

        } catch (err) {
            shareButton.innerHTML = 'Failed to copy image!';
                setTimeout(() => {
                    shareButton.innerHTML = 'Copy Image';
                    shareButton.style.backgroundColor = 'rgb(218, 204, 162)';
                    shareButton.style.pointerEvents = 'auto';
            }, 3000);
            console.error("Failed to copy image: ", err);
            shareButton.innerHTML = 'Error!';
        }
    }, 2000);
    });
    document.addEventListener('paste', (e) => {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
}