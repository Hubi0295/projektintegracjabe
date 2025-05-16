const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const router = express.Router();
const pool = require('../db');
const SECRET_KEY = 'e91f696e93ce5cb5a43208aa0368aae3f711f1a03a66bb052290a22df6fd266fz';
router.use(cookieParser());

router.get('/test',(req,res)=>{
    console.log(req.query.inflation)
    res.json({
        "date":"2025-05-16",
        "averageSalary": {
            "values": [1050, 3250, 5450, 7550, 10200],
            "dates": ["2012-04-01", "2014-06-15", "2017-09-10", "2020-11-20", "2023-08-30"]
        },
        "minimalSalary": {
            "values": [1500, 1750, 2050, 2400, 2850],
            "dates": ["2011-01-12", "2013-05-22", "2015-10-05", "2018-03-18", "2022-01-10"]
        },
        "minimalPension": {
            "values": [900, 1040, 1210, 1375, 1600],
            "dates": ["2010-02-01", "2012-07-12", "2014-11-30", "2017-05-25", "2020-09-15"]
        },
        "averagePension": {
            "values": [950, 1080, 1260, 1490, 1720],
            "dates": ["2009-12-10", "2012-06-20", "2015-01-25", "2018-04-05", "2022-02-19"]
        },
        "careAllowance": {
            "values": [85, 100, 120, 140, 165],
            "dates": ["2011-03-01", "2013-09-10", "2015-12-22", "2018-06-06", "2021-11-03"]
        },
        "unemploymentBenefit": {
            "values": [480, 560, 650, 730, 820],
            "dates": ["2009-08-05", "2011-10-14", "2014-06-30", "2017-01-19", "2021-04-22"]
        },
        "inflation": {
            "values": [1.0, 1.7, 2.5, 3.6, 5.9],
            "dates": ["2010-02-10", "2012-08-21", "2015-04-09", "2018-12-17", "2022-06-25"]
        },
        "pkb": {
            "values": [400000, 495000, 585000, 700000, 845000],
            "dates": ["2009-10-01", "2012-05-19", "2014-12-11", "2017-10-28", "2021-07-13"]
        },
        "pkbPerCapita": {
            "values": [11000, 12300, 13800, 16000, 18300],
            "dates": ["2010-06-07", "2013-03-19", "2015-11-27", "2019-02-18", "2023-05-12"]
        },
        "ppp": {
            "values": [460000, 550000, 640000, 740000, 865000],
            "dates": ["2010-01-18", "2012-12-06", "2015-08-14", "2019-01-09", "2023-03-31"]
        },
        "pppPerCapita": {
            "values": [11800, 13200, 14900, 17100, 19300],
            "dates": ["2011-02-20", "2013-11-01", "2016-07-23", "2020-05-08", "2024-01-16"]
        },
        "globalNews":{
            "articles": [
                {
                    "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                    "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                    "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                    "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                    "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                    "publishedAt": "2022-09-28T08:14:24Z",
                    "source": {
                        "name": "PhoneArena",
                        "url": "https://www.phonearena.com"
                    }
                },
                {
                    "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                    "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                    "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                    "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                    "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                    "publishedAt": "2022-09-28T08:14:24Z",
                    "source": {
                        "name": "PhoneArena",
                        "url": "https://www.phonearena.com"
                    }
                }
            ]
        },
        "polishNews":{
            "articles":[
                {
                    "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                    "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                    "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                    "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                    "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                    "publishedAt": "2022-09-28T08:14:24Z",
                    "source": {
                        "name": "PhoneArena",
                        "url": "https://www.phonearena.com"
                    }
                },
                {
                    "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                    "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                    "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                    "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                    "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                    "publishedAt": "2022-09-28T08:14:24Z",
                    "source": {
                        "name": "PhoneArena",
                        "url": "https://www.phonearena.com"
                    }
                }
            ]
        }
    })
})
router.get('/latest',(req,res)=>{
    // const token = req.cookies.token;
    // if (!token) return res.status(401).json({ message: 'Brak tokena' });
    // const decoded = jwt.verify(token, SECRET_KEY);
    // const userName = decoded.username
    res.json({
        first:{
            "date":"2025-05-16",
            "averageSalary": {
                "values": [1050, 3250, 5450, 7550, 10200],
                "dates": ["2012-04-01", "2014-06-15", "2017-09-10", "2020-11-20", "2023-08-30"]
            },
            "minimalSalary": {
                "values": [1500, 1750, 2050, 2400, 2850],
                "dates": ["2011-01-12", "2013-05-22", "2015-10-05", "2018-03-18", "2022-01-10"]
            },
            "minimalPension": {
                "values": [900, 1040, 1210, 1375, 1600],
                "dates": ["2010-02-01", "2012-07-12", "2014-11-30", "2017-05-25", "2020-09-15"]
            },
            "averagePension": {
                "values": [950, 1080, 1260, 1490, 1720],
                "dates": ["2009-12-10", "2012-06-20", "2015-01-25", "2018-04-05", "2022-02-19"]
            },
            "careAllowance": {
                "values": [85, 100, 120, 140, 165],
                "dates": ["2011-03-01", "2013-09-10", "2015-12-22", "2018-06-06", "2021-11-03"]
            },
            "unemploymentBenefit": {
                "values": [480, 560, 650, 730, 820],
                "dates": ["2009-08-05", "2011-10-14", "2014-06-30", "2017-01-19", "2021-04-22"]
            },
            "inflation": {
                "values": [1.0, 1.7, 2.5, 3.6, 5.9],
                "dates": ["2010-02-10", "2012-08-21", "2015-04-09", "2018-12-17", "2022-06-25"]
            },
            "pkb": {
                "values": [400000, 495000, 585000, 700000, 845000],
                "dates": ["2009-10-01", "2012-05-19", "2014-12-11", "2017-10-28", "2021-07-13"]
            },
            "pkbPerCapita": {
                "values": [11000, 12300, 13800, 16000, 18300],
                "dates": ["2010-06-07", "2013-03-19", "2015-11-27", "2019-02-18", "2023-05-12"]
            },
            "ppp": {
                "values": [460000, 550000, 640000, 740000, 865000],
                "dates": ["2010-01-18", "2012-12-06", "2015-08-14", "2019-01-09", "2023-03-31"]
            },
            "pppPerCapita": {
                "values": [11800, 13200, 14900, 17100, 19300],
                "dates": ["2011-02-20", "2013-11-01", "2016-07-23", "2020-05-08", "2024-01-16"]
            },
            "globalNews":{
                "articles": [
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    },
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    }
                ]
            },
            "polishNews":{
                "articles":[
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    },
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    }
                ]
            }
        },
        second:{
            "date":"2025-05-15",
            "averageSalary": {
                "values": [1200, 2900, 4700, 6800, 9500],
                "dates": ["2011-03-10", "2013-07-22", "2016-12-14", "2020-05-30", "2023-09-15"]
            },
            "minimalSalary": {
                "values": [1300, 1600, 1900, 2300, 2750],
                "dates": ["2010-05-11", "2012-09-08", "2015-01-19", "2017-11-03", "2022-03-29"]
            },
            "minimalPension": {
                "values": [850, 980, 1150, 1290, 1450],
                "dates": ["2009-12-01", "2012-02-16", "2014-08-27", "2017-03-13", "2020-12-09"]
            },
            "averagePension": {
                "values": [900, 1050, 1220, 1410, 1600],
                "dates": ["2010-07-05", "2012-11-18", "2015-09-04", "2018-06-22", "2021-10-01"]
            },
            "careAllowance": {
                "values": [95, 110, 125, 145, 170],
                "dates": ["2011-02-02", "2013-06-10", "2016-01-28", "2018-11-15", "2021-07-30"]
            },
            "unemploymentBenefit": {
                "values": [520, 590, 670, 750, 840],
                "dates": ["2010-01-20", "2012-03-17", "2014-10-02", "2017-06-25", "2021-01-12"]
            },
            "inflation": {
                "values": [1.1, 1.8, 2.9, 4.0, 6.2],
                "dates": ["2010-06-15", "2012-12-01", "2015-07-14", "2018-10-05", "2022-05-19"]
            },
            "pkb": {
                "values": [430000, 505000, 600000, 710000, 860000],
                "dates": ["2009-08-12", "2012-04-09", "2014-11-23", "2017-09-06", "2021-11-30"]
            },
            "pkbPerCapita": {
                "values": [11200, 12600, 14300, 16500, 18800],
                "dates": ["2010-04-07", "2013-01-19", "2016-10-03", "2019-08-12", "2024-02-05"]
            },
            "ppp": {
                "values": [500000, 575000, 660000, 760000, 890000],
                "dates": ["2010-02-25", "2013-05-03", "2016-02-17", "2019-05-27", "2023-07-10"]
            },
            "pppPerCapita": {
                "values": [12000, 13400, 15100, 17400, 19800],
                "dates": ["2011-06-30", "2014-01-11", "2017-05-26", "2020-10-14", "2024-04-28"]
            },
            "globalNews":{
                "articles": [
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    },
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    }
                ]
            },
            "polishNews":{
                "articles":[
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    },
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    }
                ]
            }
        },
        third:{
            "date":"2025-05-14",
            "averageSalary": {
                "values": [1150, 2700, 4600, 6900, 9800],
                "dates": ["2011-01-18", "2013-03-25", "2016-05-09", "2020-02-17", "2023-11-04"]
            },
            "minimalSalary": {
                "values": [1350, 1620, 1940, 2280, 2680],
                "dates": ["2010-02-28", "2012-07-19", "2014-12-05", "2017-10-10", "2021-06-29"]
            },
            "minimalPension": {
                "values": [890, 1010, 1170, 1340, 1500],
                "dates": ["2009-11-01", "2011-12-12", "2014-04-15", "2017-01-02", "2020-10-21"]
            },
            "averagePension": {
                "values": [920, 1070, 1230, 1440, 1630],
                "dates": ["2010-05-20", "2012-08-30", "2015-02-18", "2018-07-07", "2022-03-15"]
            },
            "careAllowance": {
                "values": [92, 108, 123, 138, 160],
                "dates": ["2011-04-12", "2013-10-22", "2016-08-05", "2018-11-27", "2021-12-01"]
            },
            "unemploymentBenefit": {
                "values": [510, 580, 665, 740, 825],
                "dates": ["2010-01-10", "2012-06-03", "2014-09-18", "2017-12-12", "2021-08-06"]
            },
            "inflation": {
                "values": [1.3, 1.9, 2.7, 3.8, 6.3],
                "dates": ["2010-03-15", "2012-11-25", "2015-06-14", "2019-02-01", "2022-10-10"]
            },
            "pkb": {
                "values": [440000, 510000, 600000, 715000, 870000],
                "dates": ["2009-09-09", "2011-11-22", "2014-08-11", "2017-04-30", "2021-12-19"]
            },
            "pkbPerCapita": {
                "values": [11400, 12900, 14500, 16800, 19000],
                "dates": ["2010-01-05", "2012-10-14", "2015-11-09", "2019-01-28", "2024-03-03"]
            },
            "ppp": {
                "values": [505000, 580000, 670000, 765000, 895000],
                "dates": ["2010-05-25", "2013-02-06", "2016-04-23", "2019-10-20", "2023-06-11"]
            },
            "pppPerCapita": {
                "values": [12200, 13700, 15400, 17700, 20000],
                "dates": ["2011-05-01", "2014-02-13", "2017-06-08", "2020-08-19", "2024-07-01"]
            },
            "globalNews":{
                "articles": [
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    },
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    }
                ]
            },
            "polishNews":{
                "articles":[
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    },
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    }
                ]
            }
        },
        fourth:{
            "date":"2025-05-13",
            "averageSalary": {
                "values": [1100, 2550, 4350, 6600, 9400],
                "dates": ["2011-02-20", "2013-06-30", "2016-03-21", "2020-09-10", "2023-12-05"]
            },
            "minimalSalary": {
                "values": [1280, 1530, 1810, 2200, 2600],
                "dates": ["2010-04-11", "2012-08-03", "2014-11-25", "2017-07-14", "2021-05-09"]
            },
            "minimalPension": {
                "values": [870, 1000, 1130, 1290, 1480],
                "dates": ["2009-10-07", "2012-01-19", "2014-09-01", "2017-02-26", "2020-07-18"]
            },
            "averagePension": {
                "values": [940, 1090, 1270, 1450, 1660],
                "dates": ["2010-06-12", "2013-01-30", "2015-10-15", "2018-05-23", "2022-02-01"]
            },
            "careAllowance": {
                "values": [88, 104, 119, 134, 158],
                "dates": ["2011-03-21", "2013-09-28", "2016-02-06", "2018-10-17", "2021-11-29"]
            },
            "unemploymentBenefit": {
                "values": [495, 570, 640, 720, 815],
                "dates": ["2010-02-05", "2012-07-16", "2014-12-22", "2017-03-31", "2021-06-01"]
            },
            "inflation": {
                "values": [1.0, 1.5, 2.4, 3.9, 6.1],
                "dates": ["2010-01-28", "2013-03-13", "2015-10-06", "2018-08-11", "2022-04-04"]
            },
            "pkb": {
                "values": [420000, 500000, 595000, 705000, 860000],
                "dates": ["2009-06-17", "2011-10-23", "2014-07-18", "2017-05-04", "2021-10-22"]
            },
            "pkbPerCapita": {
                "values": [11100, 12700, 14300, 16300, 18900],
                "dates": ["2010-03-14", "2012-12-20", "2015-08-02", "2019-03-09", "2024-01-27"]
            },
            "ppp": {
                "values": [495000, 570000, 655000, 750000, 885000],
                "dates": ["2010-04-18", "2013-02-27", "2015-11-11", "2019-06-16", "2023-08-07"]
            },
            "pppPerCapita": {
                "values": [11900, 13500, 15100, 17400, 19900],
                "dates": ["2011-07-10", "2014-01-05", "2017-04-19", "2020-11-08", "2024-06-22"]
            },
            "globalNews":{
                "articles": [
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    },
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    }
                ]
            },
            "polishNews":{
                "articles":[
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    },
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    }
                ]
            }
        },
        fifth:{
            "date":"2025-05-12",
            "averageSalary": {
                "values":[1000,2000,3000,5000,8000],
                "dates":["2013-05-14","2015-05-14","2019-05-14","2021-05-14","2023-05-14"]
            },
            "minimalSalary": {
                "values": [1250, 1380, 1650, 1980, 2450],
                "dates": ["2012-03-12", "2014-08-25", "2016-11-03", "2019-07-18", "2022-10-29"]
            },
            "minimalPension": {
                "values": [700, 820, 930, 1100, 1280],
                "dates": ["2011-06-22", "2013-09-15", "2015-12-01", "2018-04-17", "2021-09-08"]
            },
            "averagePension": {
                "values": [880, 1020, 1180, 1400, 1650],
                "dates": ["2010-05-30", "2012-12-11", "2016-01-19", "2019-03-05", "2023-01-14"]
            },
            "careAllowance": {
                "values": [90, 100, 115, 130, 150],
                "dates": ["2012-01-01", "2014-05-14", "2016-10-10", "2018-12-25", "2023-06-06"]
            },
            "unemploymentBenefit": {
                "values": [500, 580, 660, 740, 820],
                "dates": ["2010-03-01", "2012-10-18", "2015-03-22", "2017-08-09", "2021-12-27"]
            },
            "inflation": {
                "values": [1.2, 1.6, 2.1, 3.3, 6.5],
                "dates": ["2011-07-04", "2013-05-21", "2016-02-14", "2019-10-05", "2023-04-01"]
            },
            "pkb": {
                "values": [450000, 520000, 610000, 720000, 850000],
                "dates": ["2010-01-10", "2012-06-30", "2015-08-19", "2018-11-25", "2022-09-14"]
            },
            "pkbPerCapita": {
                "values": [11500, 12800, 14400, 16200, 18500],
                "dates": ["2011-03-15", "2013-10-07", "2016-06-12", "2020-01-29", "2024-05-03"]
            },
            "ppp": {
                "values": [510000, 580000, 660000, 755000, 870000],
                "dates": ["2010-04-22", "2013-01-30", "2015-05-16", "2019-09-01", "2023-12-20"]
            },
            "pppPerCapita": {
                "values": [12500, 13800, 15200, 17200, 19500],
                "dates": ["2011-09-08", "2014-03-12", "2017-11-17", "2021-01-06", "2024-08-22"]
            },
            "globalNews":{
                "articles": [
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    },
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    }
                ]
            },
            "polishNews":{
                "articles":[
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    },
                    {
                        "title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
                        "description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
                        "content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
                        "url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
                        "image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
                        "publishedAt": "2022-09-28T08:14:24Z",
                        "source": {
                            "name": "PhoneArena",
                            "url": "https://www.phonearena.com"
                        }
                    }
                ]
            }
        }
    })

})
module.exports = router;
