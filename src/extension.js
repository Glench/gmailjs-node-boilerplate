"use strict";

const jQuery = require("jquery");
const $ = jQuery;
const GmailFactory = require("gmail-js");
const gmail = new GmailFactory.Gmail($);
window.gmail = gmail;

gmail.observe.on("load", () => {
    if (gmail.check.is_inside_email()) {
        const id = gmail.get.email_id()
        const email = new gmail.dom.email(id)
        console.log(id, email)
        modify_email(email)
    }
    gmail.observe.on("view_email", modify_email)
});

const separator_re = /(<br>|,|-|at|from|\:|\s)+/gi
const day_re = /(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thurs|thur|fri|sat|sun)\.?/gi
// date_re testing: https://regexr.com/4meog
const date_re = /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|aug|sept|sep|oct|nov|dec).?\s+([0-3]?[0-9])(st|nd|rd|th)?,?\s*(\d{4})?/gi
// time_re testing: https://regexr.com/4meoa
const time_re = /(([0-9][0-9]?)(:([0-5][0-9]))?\s*([paPA]\.?[mM]\.?)?)|midnight|noon/gi

const day_date_time_re = new RegExp(`(${day_re.source})?(${separator_re.source})*(${date_re.source})(${separator_re.source})*(${time_re.source})`, 'gi')

function modify_email(email) {
    // test with this email: https://mail.google.com/mail/u/0/#inbox/FMfcgxwDrcBVgdSXpwJSntsSZLWmBvzn

    console.log("Email body:", email.body());

    console.log(day_date_time_re)
    email.body(email.body().replace(day_date_time_re, 'SDFDSFDSFDSF'))
}

function make_gcal_link() {
    return '<a href="" target="_blank" style="">   </a>'
}
