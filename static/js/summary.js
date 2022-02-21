document.addEventListener('DOMContentLoaded', function () {
    $.ajax({
        url: '/api/results',
        data: {
            reverse: true,
        },
        success: function (result) {
            // extractTimeseriesData(result);
            setupCharts(
                getHeadacheData(result),
                getCerealData(result),
                getEntertainmentData(result),
                getComicData(result),
                getPCData(result),
                getKeyboardData(result),
                getNumSurveysPerDay(result)
            );
            var moreTimeMoreMoney = document.getElementById('moreTimeMoreMoney');
            var suggestedList = document.getElementById('#suggestedList');
            result.forEach((item) => {
                if (item['more_time_money'] !== null) {
                    var node = document.createElement('LI'); 
                    var textnode = document.createTextNode(`${item['more_time_money']}`);
                    node.appendChild(textnode);
                    moreTimeMoreMoney.appendChild(node);
                }
                if (item['suggested-questions'] !== null || item['suggested-questions'] !== undefined) {
                    var node = document.createElement('LI'); 
                    var textnode = document.createTextNode(`${item['suggested-questions']}`);
                    node.appendChild(textnode);
                    commentList.appendChild(node);
                }
            });
        },
    });

    var getHeadacheData = (result) => {
        var headacheData = new Array(3);
        headacheData.fill(0);
        result.forEach((item) => {
            if (item['headache'] === 'advil') {
                headacheData[0]++;
            } else if (item['headache'] === 'tylenol') {
                headacheData[1]++;
            } else if (item['headache'] === 'sleep') {
                headacheData[2]++;
            } 
        });
        return headacheData;
    };

    var getCerealData = (result) => {
        var cerealData = new Array(2);
        cerealData.fill(0);
        result.forEach((item) => {
            if (item['cereal'] === 'yes') {
                cerealData[0]++;
            } else if (item['cereal'] === 'no') {
                cerealData[1]++;
            } 
        });
        return cerealData;
    };

    var getEntertainmentData = (result) => {
        var entertainmentData = new Array(3);
        entertainmentData.fill(0);
        result.forEach((item) => {
            if (item['entertainment'] === 'youtube') {
                entertainmentData[0]++;
            } else if (item['entertainment'] === 'netflix') {
                entertainmentData[1]++;
            } else if (item['entertainment'] === 'both') {
                entertainmentData[2]++;
            } 
        });
        return entertainmentData;
    };

    var getComicData = (result) => {
        var comicData = new Array(2);
        comicData.fill(0);
        result.forEach((item) => {
            if (item['comic'] === 'marvel') {
                comicData[0]++;
            } else if (item['comic'] === 'dc') {
                comicData[1]++;
            } 
        });
        return comicData;
    };

    var getPCData = (result) => {
        var pcData = new Array(2);
        pcData.fill(0);
        result.forEach((item) => {
            if (item['pc'] === 'desktop computer') {
                pcData[0]++;
            } else if (item['pc'] === 'laptop') {
                pcData[1]++;
            } 
        });
        return pcData;
    };

    var getKeyboardData = (result) => {
        var keyboardData = new Array(2);
        keyboardData.fill(0);
        result.forEach((item) => {
            if (item['keyboard'] === 'mechanical keyboard') {
                keyboardData[0]++;
            } else if (item['keyboard'] === 'magic keyboard') {
                keyboardData[1]++;
            } 
        });
        return keyboardData;
    };

    var getNumSurveysPerDay = (result) => {
        var map = {};
        result.forEach((item) => {
            var date = moment(Date.parse(item['completion_date'])).startOf('day');
            if (map.hasOwnProperty(date)) {
                map[date] += 1;
            } else {
                map[date] = 1;
            }
        });
    
        var date = moment(
            Date.parse(result[result.length - 1]['completion_date'])
        ).startOf('day');
        var timeSeriesData = [];
        while (date.isBefore(moment())) {
            if (map.hasOwnProperty(date)) {
                timeSeriesData.push({ t: date, y: map[date] });
            } else {
                timeSeriesData.push({ t: date, y: 0 });
            }
            date = date.clone().add(1, 'day').startOf('day');
        }
        return timeSeriesData;
    };

    var setupCharts = (headacheData, cerealData, entertainmentData, comicData, pcData, keyboardData, dateData) => {

        var headacheCanvas = document
        .getElementById('headacheChart')
        .getContext('2d');

        new Chart(headacheCanvas, {
            type: 'bar',
            data: {
                labels: [
                    'Advil',
                    'Tylenol',
                    'Sleep',
                ],
                datasets: [
                    {
                        label: 'Number of people',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        data: headacheData,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });

        var cerealCanvas = document
        .getElementById('cerealChart')
        .getContext('2d');

        new Chart(cerealCanvas, {
            type: 'bar',
            data: {
                labels: [
                    'Yes',
                    'No',
                ],
                datasets: [
                    {
                        label: 'Number of people',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        data: cerealData,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });

        var entertainmentCanvas = document
        .getElementById('entertainmentChart')
        .getContext('2d');

        new Chart(entertainmentCanvas, {
            type: 'bar',
            data: {
                labels: [
                    'YouTube',
                    'Netflix',
                    'YouTube and Netflix'
                ],
                datasets: [
                    {
                        label: 'Number of people',
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        data: entertainmentData,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });

        var comicCanvas = document
        .getElementById('comicChart')
        .getContext('2d');

        new Chart(comicCanvas, {
            type: 'bar',
            data: {
                labels: [
                    'Marvel',
                    'DC'
                ],
                datasets: [
                    {
                        label: 'Number of people',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        data: comicData,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });

        var pcCanvas = document
        .getElementById('pcChart')
        .getContext('2d');

        new Chart(pcCanvas, {
            type: 'bar',
            data: {
                labels: [
                    'Desktop Computer',
                    'Laptop'
                ],
                datasets: [
                    {
                        label: 'Number of people',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        data: pcData,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });

        var keyboardCanvas = document
        .getElementById('keyboardChart')
        .getContext('2d');

        new Chart(keyboardCanvas, {
            type: 'bar',
            data: {
                labels: [
                    'Mechanical',
                    'Magic'
                ],
                datasets: [
                    {
                        label: 'Number of People',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        data: keyboardData,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });

        var dateCanvas = document
        .getElementById('dateChart')
        .getContext('2d');

        var date = {
            label: 'Number of Surveys',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            backgroundColor: 'rgba(255, 99, 132, 1)',
            data: dateData,
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2,
        };

        new Chart(dateCanvas, {
            type: 'line',
            data: {
                datasets: [date],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            time: {
                                unit: 'day',
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });
    };
});