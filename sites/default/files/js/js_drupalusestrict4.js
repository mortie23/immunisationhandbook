(function($, Drupal, window, document) {

    'use strict';

    Drupal.behaviors.backtotop = {
        attach: function(context, settings) {

            var $backToTop = $('.uikit-back-to-top');

            $(document).bind('scroll', function() {
                if ($(document).scrollTop() > 1000) {
                    $backToTop.addClass('isVisible');
                } else {
                    $backToTop.removeClass('isVisible');
                }
            });

            $backToTop.click(function() {
                $('html,body', context).stop().animate({
                    scrollTop: 0
                }, 'slow', 'swing');
            });
        }

    };
})(jQuery, Drupal, this, this.document);;
! function(h, p) {
    "use strict";
    var r, s, n, d, u, c, l, m, v, i, f, g, o;

    function clearPage() { clearRegion("all"), l.forEach(function(e) { i.append(p.theme("statusMessage", e.type, e.text)) }), l = [] }

    function setErrorForElement(e, t) {
        h("[errorId='" + e + "']").addClass("error"),
            function insertErrorMessage(e, t) { i.append(p.theme("statusMessage", "error", t, e)), goTop() }(e, t)
    }

    function buildStep(e) {
        if (e !== s) {
            var t = r[e].gtm;
            if (t && dataLayer) { var a = t.virtualPageURL; "vaccineStep" === e && (a += d.getEntryMode() + "/"), dataLayer.push({ event: t.event, virtualPageURL: a, virtualPageTitle: t.virtualPageTitle }) }
            if (d.setCurrentStep(e), m.use_local_storage) {
                var n = JSON.stringify(d);
                localStorage.setItem("health.calculator", n)
            }
            s = e
        }! function build() { r[s].build() }(), setEditMode(!1), h("#calculator").removeClass(h("#calculator").attr("class")).addClass(r[e].class), o.append("<p><small>" + m.version + "</small></p>"), goTop()
    }

    function buildProgressBar() {
        var e, t, a, n = r[s].stage,
            i = ["Pre-calculation screening", "Personal details", "Vaccination history", "Catch-up schedule"];
        if (n)
            for (t = h("<ol/>", { class: "calculator-progress" }), e = 1; e < 5; e++) {
                var o = [];
                e < n && o.push("is-complete"), e === n && o.push("is-active"), 4 === e && o.push("progress-last"), a = h("<li/>", { class: o.join(" "), "progress-stage": e }).text(i[e - 1]), t.append(a)
            }
        return t
    }

    function listVaccinationsByDate(o) {
        var r = function getVaccinationsByDate() { var a = {}; return h.each(d.vaccinationHistory, function(t, e) { e.forEach(function(e) { a[e] || (a[e] = []), a[e].push(t) }) }), a }(),
            a = [];
        h.each(r, function(e, t) { a.push(convertDate("ISO", e)) }), a.sort(), a.forEach(function(e) {
            var t = convertDate("Oz", e);
            r[t]
        });
        var s = h("<div/>", { class: "vaccinations-list" });
        return a.forEach(function(e) {
            var t = convertDate("Oz", e),
                a = h("<div/>", { class: "vaccinations-list-links", linksfor: e });
            o && a.append(p.theme("editLink", e)).append(h("<span/>", { class: "vaccinations-list-links-divider" }).text("|")).append(p.theme("removeLink", e));
            var i = h("<div/>", { id: e, class: "vaccinations-list-item" });
            i.append(h("<div/>", { class: "vaccinations-list-label" }).text(p.t("Date of vaccination"))), i.append(h("<div/>", { class: "vaccinations-list-vaccination-date" }).text(formattedDate(t))), i.append(h("<div/>", { class: "vaccinations-list-label" }).text(p.t("@mode(s) administered", { "@mode": capitalise(u) })));
            var n = r[t];
            h.each(n, function(e, t) {
                var a = CalculatorVaccines.getVaccine(t);
                if ("antigen" === u) {
                    var n = h("<div/>", { class: "vaccinations-list-vaccine" }).append(h("<div/>", { class: "vaccinations-list-vaccine-name" }).text(a.antigen_name)).append(h("<span/>", { class: "vaccinations-list-vaccine-suffix" }).text(a.vaccine_name));
                    i.append(n)
                } else n = h("<div/>", { class: "vaccinations-list-vaccine" }).append(h("<div/>", { class: "vaccinations-list-vaccine-name" }).text(a.vaccine_name)).append(h("<span/>", { class: "vaccinations-list-vaccine-suffix" }).text(a.antigen_name)), i.append(n)
            }), s.append(a), s.append(i)
        }), s
    }

    function clearRegion(e) { "header" !== e && "all" !== e || v.empty(), "messages" !== e && "all" !== e || i.empty(), "content" !== e && "all" !== e || f.empty(), "buttons" !== e && "all" !== e || g.empty(), "footer" !== e && "all" !== e || o.empty() }

    function setCheckedRadio(e, t) { for (var a in e.options) e.options[a].value === t && (e.options[a].checked = "checked") }

    function getCheckedRadio(e) {
        var t, a = document.getElementsByName(e);
        for (t = 0; t < a.length; t++)
            if (a[t].checked) return a[t].value;
        return ""
    }

    function getCheckedCheckboxes(e) { for (var t = document.getElementsByName(e), a = [], n = 0; n < t.length; n++) t[n].checked && a.push(t[n].value); return a }

    function validDate(e) {
        var t = e.split("/"),
            a = new Date(t[1] + "/" + t[0] + "/" + t[2]);
        return a.getMonth() + 1 === parseInt(t[1]) && a.getDate() === parseInt(t[0]) && a.getFullYear() === parseInt(t[2]) && a
    }

    function goTop() { window.scrollTo(0, 0) }

    function setEditMode(e) { e ? (c = !0, h("#calculator").addClass("editing")) : (c = !1, h("#calculator").removeClass("editing")) }

    function formItemChangeHandler() {
        var e = i.find("[errorId='" + h(this).attr("errorId") + "']");
        e && (h(this).val().trim().length ? (e.slideUp(300), h(this).removeClass("error")) : h(this).addClass("error"))
    }

    function previousButtonHandler(e) {
        if (e.preventDefault(), !c)
            if ("confirmationStep" === s && "skip" === d.getEntryMode()) {
                var t = r[s].previous;
                buildStep(r[t].previous)
            } else r[s].previous && buildStep(r[s].previous)
    }

    function nextButtonHandler(e) { e.preventDefault(), c || (i.empty(), r[s].validate ? r[s].validate() && r[s].submit() : r[s].submit && r[s].submit()) }

    function resetLinkHandler(e) { if (e.preventDefault(), !c) { var t = !0; "invalidUserStep" !== s && d.getScreeningAge() && (t = window.confirm("If you restart the Calculator, you will lose all information that you have entered so far.\n\nSelect 'Ok' to proceed, or 'Cancel' to stay on this page.")), t && (d = new User, clearRegion("messages"), buildStep("exclusionsStep")) } }

    function pdfButtonHandler(e) {
        e.preventDefault(), CalculatorPDF.initPDF(), CalculatorPDF.writeLogo(m.version), CalculatorPDF.writeHeading(p.t("Catch-up schedule"), 1, 8, 4), CalculatorPDF.writeTextColumns([{ text: "Note:", offSetX: 15, fontType: "bold" }, { text: "If the person does not present on the date/s recommended in this catch-up schedule, a", offSetX: 27 }], 0), CalculatorPDF.writeText("new calculation should be undertaken at each visit to ensure that minimum intervals between"), CalculatorPDF.writeText("antigen doses are met and the recommended schedule remains current."), CalculatorPDF.writeText("This is a catch-up schedule. Once the person has caught up, they may need more", 4), CalculatorPDF.writeText("recommended NIP vaccines in the future."), "Undisclosed" === d.getATSI() && (CalculatorPDF.writeText("Aboriginal and Torres Strait Islander peoples are recommended to receive additional", 4), CalculatorPDF.writeText("vaccines, available free of cost. Please refer state specific schedule for additional information.")), CalculatorPDF.writeHeading(d.getFirstName(), 2, 8, 4), CalculatorPDF.writeTextColumns([{ text: "Date of birth:", offSetX: 15, fontType: "bold" }, { text: d.getDOB(), offSetX: 43 }], 0), CalculatorPDF.writeTextColumns([{ text: "Gender:", offSetX: 15, fontType: "bold" }, { text: d.getGender(), offSetX: 33 }], 0), CalculatorPDF.writeTextColumns([{ text: "Aboriginal or Torres Strait Islander:", offSetX: 15, fontType: "bold" }, { text: d.getATSI(), offSetX: 88 }], 0);
        var t = d.getRecords();
        t.length ? t.forEach(function(e, t) { 0 === t ? CalculatorPDF.writeTextColumns([{ text: "Immunisation record(s) viewed:", offSetX: 15, fontType: "bold" }, { text: e, offSetX: 80 }], 0) : CalculatorPDF.writeTextColumns([{ text: e, offSetX: 80 }], 0) }) : CalculatorPDF.writeTextColumns([{ text: "Immunisation record(s) viewed:", offSetX: 15, fontType: "bold" }, { text: "None", offSetX: 80 }], 0), CalculatorPDF.writeTextColumns([{ text: "Prescription immunosuppressive medication:", offSetX: 15, fontType: "bold" }, { text: d.getMedication(), offSetX: 109 }], 0), CalculatorPDF.writeTextColumns([{ text: "State:", offSetX: 15, fontType: "bold" }, { text: d.getState(), offSetX: 29 }], 0), CalculatorPDF.writeTextColumns([{ text: "Date created:", offSetX: 15, fontType: "bold" }, { text: formattedDate(dateToString(today())), offSetX: 44 }], 0), CalculatorPDF.writeTextColumns([{ text: "Age:", offSetX: 15, fontType: "bold" }, { text: d.formattedAge(), offSetX: 26 }], 0), CalculatorPDF.writeHeading(p.t("Vaccination history"), 2, 8, 2), CalculatorPDF.drawLine(2), r = [];
        var o = {};
        jQuery.each(CalculatorProcess.vaccinationDoses, function(a, e) { CalculatorProcess.vaccinationDoses[a]["doses-validated"] && jQuery.each(CalculatorProcess.vaccinationDoses[a]["doses-validated"], function(e, t) { t.date && (o[t.date] ? o[t.date].push({ antigen: a, valid: t.valid, message: t.message }) : (o[t.date] = [{ antigen: a, valid: t.valid, message: t.message }], r.push(t.date))) }) }), r.length ? (r.sort(sortDMY), r.forEach(function(e, t) {
            var a, n, i = o[e];
            CalculatorPDF.writeTextColumns([{ text: formattedDate(e), offSetX: 17, fontType: "bold" }], 3), jQuery.each(i, function(e, t) { a = t.valid || !t.message ? (n = CalculatorAntigens.getAntigenDescription(t.antigen), "") : (n = CalculatorAntigens.getAntigenDescription(t.antigen), t.message), CalculatorPDF.writeTextColumns([{ text: n, offSetX: 18 }, { text: a, offSetX: 195, color: "#FF0000", align: "right" }], 2) })
        })) : (CalculatorPDF.writeText(p.t("Person has not received any immunisations to date.", 3)), CalculatorPDF.drawLine(3));
        var n, i, r = [],
            s = {};
        (jQuery.each(CalculatorProcess.vaccinationDoses, function(n, e) {
            if (CalculatorProcess.vaccinationDoses[n]["doses-due"]) {
                var i = CalculatorProcess.dosesCount(n),
                    o = 1;
                jQuery.each(CalculatorProcess.vaccinationDoses[n]["doses-due"], function(e, t) {
                    if (t.valid) {
                        var a = {};
                        a.antigen = n, a.dosenumber = "(Dose " + o + " of " + i + ")", a.dosenumber = "", t.tag && (a.tag = t.tag), s[t.date] ? s[t.date].push(a) : (s[t.date] = [a], r.push(t.date))
                    }
                    "boolean" == typeof t.valid ? t.valid && o++ : o++
                })
            }
        }), CalculatorPDF.writeHeading(p.t("Vaccinations due"), 2, 8, 2), CalculatorPDF.drawLine(2), r.length) ? (r.sort(sortDMY), r.forEach(function(e) {!n && dateToObject(e) > today() ? n = e : !i && n && (i = e) }), r.forEach(function(e) {
            e === dateToString(today()) ? CalculatorPDF.writeHeading(p.t("Due immediately"), 3, 6, 3, !0) : e === n ? CalculatorPDF.writeHeading(p.t("Next appointment"), 3, 6, 3, !0) : e === i && CalculatorPDF.writeHeading(p.t("Future appointment(s)"), 3, 6, 3, !0);
            var t = s[e];
            CalculatorPDF.writeTextColumns([{ text: formattedDate(e), offSetX: 17, fontType: "bold" }], 3);
            var a = !1;
            jQuery.each(t, function(e, t) { if ("Infanrix" === t.tag) return !(a = !0) }), a && (CalculatorPDF.writeTextColumns([{ text: "Infanrix Hexa (*)", offSetX: 18, fontType: "bold" }], 1), jQuery.each(t, function(e, t) {
                if ("Infanrix" === t.tag) {
                    var a = CalculatorAntigens.getAntigenDescription(t.antigen),
                        n = t.dosenumber;
                    CalculatorPDF.writeTextColumns([{ text: "* " + a, offSetX: 18 }, { text: n, offSetX: 195, align: "right" }], 2)
                }
            })), jQuery.each(t, function(e, t) {
                if ("Infanrix" !== t.tag) {
                    var a = CalculatorAntigens.getAntigenDescription(t.antigen),
                        n = t.dosenumber;
                    CalculatorPDF.writeTextColumns([{ text: a, offSetX: 18 }, { text: n, offSetX: 195, align: "right" }], 2)
                }
            })
        })) : (CalculatorPDF.writeText(p.t("The person is up-to-date. No catch-up vaccinations are needed.", 3)), CalculatorPDF.drawLine(3));
        CalculatorPDF.addPageNumbers(), CalculatorPDF.savePDF(d)
    }

    function exclusionsStep() {
        setCheckedRadio(i = { id: "radio-age", title: p.t("1. Is the catch-up for someone who is under 10 years of age?"), options: { radioAge0: { id: "radio-age-0", value: "yes", label: p.t("Yes") }, radioAge1: { id: "radio-age-1", value: "no", label: p.t("No") } } }, d.getScreeningAge());
        var e = p.theme("radios", i);
        setCheckedRadio(i = { id: "radio-residency", title: p.t("2. Who is the catch-up for?"), options: { radioResidency0: { id: "radio-residency-0", value: "resident", label: p.t("An Australian resident") }, radioResidency1: { id: "radio-residency-1", value: "travelling", label: p.t("An Australian travelling overseas") }, radioResidency2: { id: "radio-residency-2", value: "refugee", label: p.t("A refugee or humanitarian migrant") }, radioResidency3: { id: "radio-residency-3", value: "none", label: p.t("None of the above") } } }, d.getScreeningResidency());
        var t = p.theme("radios", i),
            a = { id: "check-records", title: p.t("3. Which of the following valid immunisation records was viewed during the consultation?"), preamble: p.t("To ensure the vaccination history is accurate you must refer to at least one of the following valid immunisation records during the consultation. Wherever possible, always refer to the AIR or the Immunisation History statement as well. For additional information refer <a href='" + m.link_handbook + "' target='_blank'>Immunisation Handbook</a>."), options: { checkRecords0: { id: "check-records-0", value: "Birth record", label: p.t("Birth record (Blue, Green, Red book etc.)"), suffix: "" }, checkRecords1: { id: "check-records-1", value: "Immunisation register", label: p.t("Australian Immunisation Register"), suffix: "" }, checkRecords2: { id: "check-records-2", value: "History statement", label: p.t("Australian Immunisation History Statement"), suffix: "" }, checkRecords3: { id: "check-records-3", value: "App", label: p.t("Vaccidate / Save the date to vaccinate app"), suffix: "" }, checkRecords4: { id: "check-records-4", value: "Overseas birth record", label: p.t("Overseas birth record (in English)"), suffix: "" }, checkRecords5: { id: "check-records-5", value: "Signed confirmation", label: p.t("Signature of confirmation vaccine was given?"), suffix: "" }, checkRecords6: { id: "check-records-6", value: "None", label: p.t("None of the above"), suffix: "", solo: "solo" } } };
        ! function setCheckedCheckboxes(e, t) { for (var a in e.options) - 1 < t.indexOf(e.options[a].value) && (e.options[a].checked = "checked") }(a, d.getRecords());
        var n = p.theme("checkBoxes", a),
            i = { id: "radio-os", title: p.t("4. Were any vaccines administered overseas?"), options: { radioOs0: { id: "radio-os-0", value: "Yes", label: p.t("Yes") }, radioOs1: { id: "radio-os-1", value: "No", label: p.t("No") }, radioOs2: { id: "radio-os-2", value: "Not sure", label: p.t("Not sure") } } };
        setCheckedRadio(i, d.getOverseas());
        var o = p.theme("radios", i);
        setCheckedRadio(i = { id: "radio-medication", title: p.t("5. Is the person taking any immunosuppressive medication?"), options: { radioMedication0: { id: "radio-medication-0", value: "Yes", label: p.t("Yes") }, radioMedication1: { id: "radio-medication-1", value: "No", label: p.t("No") }, radioMedication2: { id: "radio-medication-2", value: "Not sure", label: p.t("Not sure") } } }, d.getMedication());
        var r = p.theme("radios", i);
        clearPage(), v.append(buildProgressBar()).append(p.theme("resetLink")).append(p.theme("header", p.t("Pre-calculation screening"))), f.append(e).append(t).append(n).append(o).append(r), g.append(p.theme("navigationButtons", null, "Next")), p.attachBehaviors(f.get(0))
    }

    function exclusionsStepValidate() { var e = !0; return getCheckedRadio("radio-age") || (setErrorForElement("radio-age", p.t("Please choose an option for question 1.")), e = !1), getCheckedRadio("radio-residency") || (setErrorForElement("radio-residency", p.t("Please choose an option for question 2.")), e = !1), getCheckedCheckboxes("check-records").length || (setErrorForElement("check-records", p.t("Please choose at least one option for question 3.")), e = !1), getCheckedRadio("radio-os") || (setErrorForElement("radio-os", p.t("Please choose an option for question 4.")), e = !1), getCheckedRadio("radio-medication") || (setErrorForElement("radio-medication", p.t("Please choose an option for question 5.")), e = !1), e }

    function exclusionsStepSubmit() {
        var e = getCheckedRadio("radio-age"),
            t = getCheckedRadio("radio-residency"),
            a = getCheckedCheckboxes("check-records"),
            n = getCheckedRadio("radio-os"),
            i = getCheckedRadio("radio-medication");
        d.setScreeningAge(e), d.setScreeningResidency(t), d.setRecords(a), d.setOverseas(n), d.setMedication(i);
        var o = !0;
        "no" === e && (o = !1), "travelling" !== t && "refugee" !== t && "none" !== t || (o = !1), "Not sure" === n && (o = !1), "Yes" !== i && "Not sure" !== i || (o = !1), buildStep(o ? "personalInfoStep" : "invalidUserStep")
    }

    function personalInfoStep() {
        var e = p.theme("textInput", p.t("Name"), "calculator-first-name", d.getFirstName(), { placeholder: "Name" }),
            t = p.theme("textInput", p.t("Date of birth"), "calculator-date", d.getDOB(), { placeholder: "dd/mm/yyyy", autocomplete: "off" }),
            a = { id: "select-state", title: p.t("Which Australian state or territory does the person currently reside in?"), preamble: p.t("Please select the Australian state or territory from the list."), options: { selectState0: { id: "select-state-0", value: "", label: p.t("Please select") }, selectState1: { id: "select-state-1", value: "NSW", label: p.t("New South Wales") }, selectState2: { id: "select-state-2", value: "ACT", label: p.t("ACT") }, selectState3: { id: "select-state-3", value: "VIC", label: p.t("Victoria") }, selectState4: { id: "select-state-4", value: "QLD", label: p.t("Queensland") }, selectState5: { id: "select-state-5", value: "SA", label: p.t("South Australia") }, selectState6: { id: "select-state-6", value: "WA", label: p.t("Western Australia") }, selectState7: { id: "select-state-7", value: "NT", label: p.t("Northern Territory") }, selectState8: { id: "select-state-8", value: "TAS", label: p.t("Tasmania") } }, default: d.getState() };
        ! function setSelected(e, t) { for (var a in e.options) e.options[a].value === t && (e.options[a].selected = "selected") }(a, d.getState());
        var n = p.theme("select", a),
            i = { id: "radio-gender", title: p.t("What is the birth gender of the person?"), preamble: p.t("The tool provides biological or birth gender-specific catch-up recommendations where appropriate."), options: { radioGender0: { id: "radio-gender-0", value: "Female", label: p.t("Female") }, radioGender1: { id: "radio-gender-1", value: "Male", label: p.t("Male") }, radioGender2: { id: "radio-gender-2", value: "Indeterminate / Intersex / Unspecified", label: p.t("Indeterminate / Intersex / Unspecified") }, radioGender3: { id: "radio-gender-3", value: "Undisclosed", label: p.t("Prefer not to disclose") } } };
        setCheckedRadio(i, d.getGender());
        var o = p.theme("radios", i);
        setCheckedRadio(i = { id: "radio-atsi", title: p.t("Is the person of Aboriginal and/or Torres Strait Islander origin?"), preamble: p.t("Aboriginal and Torres Strait Islander peoples are recommended to receive additional vaccines, available free of cost."), options: { radioATSI0: { id: "radio-atsi-0", value: "Yes", label: p.t("Yes") }, radioATSI1: { id: "radio-atsi-1", value: "No", label: p.t("No") }, radioATSI2: { id: "radio-atsi-2", value: "Undisclosed", label: p.t("Prefer not to disclose") } } }, d.getATSI());
        var r = p.theme("radios", i);
        clearPage(), v.append(buildProgressBar()).append(p.theme("resetLink")).append(p.theme("header", p.t("Personal details"))), f.append(e).append(t).append(n).append(o).append(r), g.append(p.theme("navigationButtons", "Back", "Next")), p.attachBehaviors(f.get(0))
    }

    function personalInfoStepValidate() {
        var e = !0;
        h("#edit-calculator-first-name").val().trim().length || (setErrorForElement("calculator-first-name", p.t("Please enter name of the person.")), e = !1);
        var t = h("#edit-calculator-date").val();
        if (validDate(t)) {
            var a = today(),
                n = dateToObject(t);
            a < n && (setErrorForElement("calculator-date", p.t("The date of birth can not be in the future.")), e = !1), n <= a.setFullYear(a.getFullYear() - 10) && (setErrorForElement("calculator-date", p.t('"The Calculator has been developed and designed for Australian children who are less than 10 years of age.')), e = !1)
        } else setErrorForElement("calculator-date", p.t("Please provide a valid date of birth in dd/mm/yyyy format.")), e = !1;
        return h("#edit-select-state").val().trim().length || (setErrorForElement("select-state", p.t("Please select a State or Territory.")), e = !1), getCheckedRadio("radio-gender") || (setErrorForElement("radio-gender", p.t("Please select an option for the biological gender question.")), e = !1), getCheckedRadio("radio-atsi") || (setErrorForElement("radio-atsi", p.t("Please select an option for the origin.")), e = !1), e
    }

    function personalInfoStepSubmit() { d.setFirstName(h("#edit-calculator-first-name").val()), d.setDOB(h("#edit-calculator-date").val()), d.setState(h("#edit-select-state").val()), d.setGender(getCheckedRadio("radio-gender")), d.setATSI(getCheckedRadio("radio-atsi")), buildStep("entryModeStep") }

    function entryModeStep() {
        var e = { radioMode0: { id: "radio-mode-0", value: "antigen", label: p.t("Antigen/s") }, radioMode1: { id: "radio-mode-1", value: "vaccine", label: p.t("Vaccine/s") }, radioMode2: { id: "radio-mode-2", value: "skip", label: p.t("Skip this step (no vaccines administered)") } };
        d.hasVaccinations() && ("vaccine" === d.getEntryMode() ? e.radioMode0.disabled = !0 : e.radioMode1.disabled = !0, e.radioMode2.disabled = !0);
        var t = { id: "radio-mode", title: p.t("How do you wish to enter vaccination history?"), preamble: "", options: e };
        setCheckedRadio(t, d.getEntryMode());
        var a = p.theme("radios", t);
        clearPage(), v.append(buildProgressBar()).append(p.theme("resetLink")).append(p.theme("header", p.t("Vaccination history"))).append(h("<p/>").text(p.t("Choose which way you wish to enter the previous vaccinations information. Once vaccinations history has been added this cannot be changed."))), f.append(a), g.append(p.theme("navigationButtons", "Back", "Next")), p.attachBehaviors(f.get(0))
    }

    function entryModeStepValidate() { var e = !0; return getCheckedRadio("radio-mode") || (setErrorForElement("radio-mode", p.t("Please choose an option.")), e = !1), e }

    function entryModeStepSubmit() { u = getCheckedRadio("radio-mode"), d.setEntryMode(u), buildStep("skip" === u ? "confirmationStep" : "vaccineStep") }

    function vaccineStep() {
        var e = d.getEntryMode(),
            t = h("<p/>").text(p.t("To generate a catch-up schedule, please enter the date/s and the @modes administered on each date.", { "@mode": e }));
        if (d.getOverseas) {
            var a = h("<p/>").text(p.t("People who have been vaccinated overseas may have received vaccines which are different to those recommended in the "));
            a.append(p.theme("hyperlink", m.link_nip, "Australian National Immunisation Program", "_blank")), a.append(p.t(". For additional information, please refer to ")), a.append(p.theme("hyperlink", m.link_foreign_language_terms, "Foreign Language Terms", "_blank")), a.append(p.t(" to aid in translating foreign immunisation records.")), h.merge(t, a)
        }
        h.merge(t, h("<h3/>").text(p.t("Enter @modes", { "@mode": e }))), h.merge(t, h("<p/>").text(p.t('Add the date, followed by all the @modes administered on this date. Multiple @modes can be selected on a date. Choose "Next" once all @modes have been added.', { "@mode": e })));
        var n = p.theme("historyForm", {});
        d.hasVaccinations() && n.addClass("hidden"), clearPage(), v.append(buildProgressBar()).append(p.theme("resetLink")).append(p.theme("header", p.t("Vaccination history"))).append(t), f.append(listVaccinationsByDate(!0)).append(n), g.append(p.theme("navigationButtons", "Back", "Next"));
        var i = h("<div/>", { class: "form-actions form-wrapper button-add-wrapper" });
        i.append(h("<input/>", { type: "submit", class: "form-submit button-add", value: p.t("Add another date") }).click(addButtonHandler)), f.append(i), p.attachBehaviors(f.get(0))
    }

    function editButtonHandler(e) {
        if (e.preventDefault(), !c) {
            var t = h(this).attr("identifier"),
                a = convertDate("Oz", t),
                n = d.getVaccinationHistory() ? d.getVaccinationHistory() : {},
                i = [];
            jQuery.each(n, function(t, e) { e.forEach(function(e) { e === a && i.push(t) }) });
            var o = { date: a, vaccines: i, heading: "Editing" },
                r = p.theme("historyForm", o);
            h("#" + t).replaceWith(r), setEditMode(!0), h('[linksfor="' + t + '"]').remove(), p.attachBehaviors(f.get(0))
        }
    }

    function addButtonHandler(e) { e.preventDefault(), c || h("div.form-vaccines-entry").hasClass("hidden") && h("div.form-vaccines-entry").toggleClass("hidden") }

    function submitButtonHandler(e) {
        e.preventDefault(), clearRegion("messages");
        var t = !0,
            n = h("#edit-calculator-date").val();
        dateToObject(n), dateToObject(d.getDOB());
        validDate(n) ? dateToObject(n) < dateToObject(d.getDOB()) ? (setErrorForElement("calculator-date", p.t("The date of vaccination cannot pre-date the date of birth.")), t = !1) : dateToObject(n) > today() && (setErrorForElement("calculator-date", p.t("The administered date can not be in the future.")), t = !1) : (setErrorForElement("calculator-date", p.t("Please enter date of vaccination in dd/mm/yyyy format.")), t = !1);
        var a = [];
        if (h.each(h("#edit-check-administered input:checked"), function() { a.push(h(this).val()) }), a.length || (setErrorForElement("check-administered", p.t("Please choose at least one vaccine or antigen.")), t = !1), t) {
            var i, o = h("#calculator-form-storage").val();
            if (o) {
                var r = JSON.parse(o);
                r.date && d.removeVaccinations(r.date)
            }
            a.forEach(function(e) {
                if (!d.addVaccination(e, n)) {
                    var t, a = CalculatorVaccines.getVaccine(e);
                    t = "antigen" === u ? a.antigen_name + " (" + a.vaccine_name + ")" : a.vaccine_name + " (" + a.antigen_name + ")", i = p.t('@mode "@description" was already entered for @date, duplicate entry ignored.', { "@mode": capitalise(u), "@description": t, "@date": formattedDate(n) }), l.push({ text: i, type: "warning" })
                }
            }), buildStep("vaccineStep")
        }
    }

    function cancelButtonHandler(e) { e.preventDefault(), clearRegion("messages"), buildStep("vaccineStep") }

    function removeButtonHandler(e) { e.preventDefault(), c || (d.removeVaccinations(convertDate("Oz", h(this).attr("identifier"))), buildStep("vaccineStep")) }

    function vaccineStepValidate() { return !0 }

    function vaccineStepStepSubmit() { buildStep("confirmationStep") }

    function confirmationStep() { clearPage(), v.append(buildProgressBar()).append(p.theme("resetLink")).append(p.theme("header", "Confirm details")).append(h("<p/>").text(p.t("Please confirm that all of the details below are correct before proceeding."))), f.append(p.theme("summaryDetails", d)).append(listVaccinationsByDate(!1)), g.append(p.theme("navigationButtons", "Back", "Confirm")), p.attachBehaviors(f.get(0)) }

    function confirmationStepSubmit() { buildStep("resultsStep") }

    function resultsStep() {
        CalculatorProcess.loadVaccinationsByAntigen(d), CalculatorProcess.processDoses(d), clearPage(), v.append(buildProgressBar()).append(p.theme("resetLink")).append(p.theme("header", "Catch-up schedule"));
        var e = h("<div/>", { class: "catchup-intro" }).append(h("<p/>").append(h("<strong/>").text(p.t("Note:"))).append(p.t(" If the person does not present on the date/s recommended in this catch-up schedule, a new calculation should be undertaken at each visit to ensure that minimum intervals between antigen doses are met and the recommended schedule remains current."))).append(h("<p/>").text(p.t("This is a catch-up schedule. Once the person has caught up, they may need more recommended NIP vaccines in the future.")));
        v.append(e), "Undisclosed" === d.getATSI() && v.append(h("<p/>").text(p.t("Aboriginal and Torres Strait Islander peoples are recommended to receive additional vaccines, available free of cost. Please refer state specific schedule for additional information."))), g.append(p.theme("navigationButtons", "Back", "Save PDF"));
        var r = [],
            i = {};
        jQuery.each(CalculatorProcess.vaccinationDoses, function(a, e) { CalculatorProcess.vaccinationDoses[a]["doses-validated"] && jQuery.each(CalculatorProcess.vaccinationDoses[a]["doses-validated"], function(e, t) { t.date && (i[t.date] ? i[t.date].push({ antigen: a, valid: t.valid, message: t.message }) : (i[t.date] = [{ antigen: a, valid: t.valid, message: t.message }], r.push(t.date))) }) });
        var a = h("<div/>", { class: "catchup-history" }).append(h("<h3/>").text(p.t("Vaccination history")));
        r.length ? (r.sort(sortDMY), r.forEach(function(e) {
            var t = i[e],
                n = h("<div/>", { class: "catchup-history-item" });
            n.append(h("<div/>", { class: "catchup-history-label" }).text(formattedDate(e))), jQuery.each(t, function(e, t) {
                var a = h("<div/>", { class: "catchup-history-vaccines" });
                t.valid || !t.message ? a.append(h("<span/>", { class: "catchup-history-antigen" }).text(CalculatorAntigens.getAntigenDescription(t.antigen))) : (a.append(h("<span/>", { class: "catchup-history-antigen invalid" }).text(CalculatorAntigens.getAntigenDescription(t.antigen))), a.append(h("<span/>", { class: "catchup-history-message invalid" }).text(t.message)), a.append(h("<div/>", { class: "calculator-clear" }))), n.append(a)
            }), a.append(n)
        })) : a.append(h("<p/>", { class: "catchup-history-empty" }).text(p.t("Person has not received any immunisations to date."))), r = [];
        var s = {};
        if (jQuery.each(CalculatorProcess.vaccinationDoses, function(n, e) {
                if (CalculatorProcess.vaccinationDoses[n]["doses-due"]) {
                    var i = CalculatorProcess.dosesCount(n),
                        o = 0;
                    jQuery.each(CalculatorProcess.vaccinationDoses[n]["doses-due"], function(e, t) {
                        if (t.valid) {
                            o++;
                            var a = {};
                            a.antigen = n, a.dosenumber = "(Dose " + o + " of " + i + ")", a.dosenumber = "", t.tag && (a.tag = t.tag), s[t.date] ? s[t.date].push(a) : (s[t.date] = [a], r.push(t.date))
                        }
                    })
                }
            }), r.length) {
            var o, c;
            r.sort(sortDMY), r.forEach(function(e) {!o && dateToObject(e) > today() ? o = e : !c && o && (c = e) });
            var l = h("<div/>", { class: "catchup-future" });
            r.forEach(function(e) {
                e === dateToString(today()) ? l.append(h("<h3/>").text(p.t("Due immediately"))) : e === o ? l.append(h("<h3/>").text(p.t("Next appointment"))) : e === c && l.append(h("<h3/>").text(p.t("Future appointment(s)")));
                var t = s[e],
                    n = h("<div/>", { class: "catchup-future-item" });
                n.append(h("<div/>", { class: "catchup-future-label" }).text(formattedDate(e)));
                var a = !1;
                if (jQuery.each(t, function(e, t) { if ("Infanrix" === t.tag) return !(a = !0) }), a) {
                    var i = h("<div/>", { class: "catchup-future-vaccines" }).append(h("<strong/>", { class: "catchup-message-infanrix" }).text("Infanrix Hexa:"));
                    jQuery.each(t, function(e, t) {
                        if ("Infanrix" === t.tag) {
                            var a = h("<div/>", { class: "catchup-future-vaccine" });
                            a.append(h("<span/>", { class: "catchup-future-antigen" }).text(CalculatorAntigens.getAntigenDescription(t.antigen))), a.append(h("<span/>", { class: "catchup-future-dosenumber" }).text(t.dosenumber)), i.append(a)
                        }
                    }), n.append(i)
                }
                jQuery.each(t, function(e, t) {
                    if (!t.tag) {
                        var a = h("<span/>", { class: "catchup-future-antigen" }).text(CalculatorAntigens.getAntigenDescription(t.antigen));
                        h.merge(a, h("<span/>", { class: "catchup-future-dosenumber" }).text(t.dosenumber)), h.merge(a, h("<div/>", { class: "calculator-clear" })), n.append(h("<div/>", { class: "catchup-future-vaccines" }).append(a))
                    }
                }), l.append(n)
            })
        } else l = h("<div/>", { class: "catchup-up-to-date" }).append(h("<h3/>").text(p.t("The person is up-to-date. No catch-up vaccinations are needed.")));
        f.append(p.theme("summaryDetails", d)).append(a).append(l), p.attachBehaviors(f.get(0))
    }

    function invalidUserStep() {
        var e, t;
        clearPage(), v.append(p.theme("resetLink")).append(p.theme("header", p.t("The NICC cannot support you at this time"))), e = p.t("Based on your answers, this version of the NICC cannot proceed in calculating a catch-up schedule."), i.append(p.theme("statusMessage", "warning", e)), t = h("<p/>").text(p.t("The National Immunisation Catch-up Calculator is based on the ")).append(p.theme("hyperlink", m.link_nip, "Australian National Immunisation Program", "_blank")).append("."), f.append(t), t = h("<p/>").text(p.t("If you are a parent or carer, please seek medical advice from a health professional.")), f.append(t), "no" === d.getScreeningAge() && (f.append(h("<h3/>").text(p.t("Age group not available for calculation"))), t = h("<p/>").text(p.t("This version of the Calculator is only suitable for persons up to 10 years of age.")), f.append(t)), "travelling" === d.getScreeningResidency() && (f.append(h("<h3/>").text(p.t("Australian travelling overseas"))), t = h("<p/>").text(p.t("The Calculator is designed for individuals receiving vaccinations within Australia. If you are planning to receive vaccinations whilst overseas, please contact your local immunisation unit for further advice.")), f.append(t)), "none" !== d.getScreeningResidency() && "refugee" !== d.getScreeningResidency() || (t = h("<p/>").text(p.t("The catch-up calculator is only suitable for Australian residents, who are under the age of 10 years.")), f.append(t)), ("Not sure" === d.getOverseas() || "Yes" === d.getOverseas() && "Yes" !== d.getMedication()) && (f.append(h("<h3/>").text(p.t("Unsure if vaccinations were administered overseas"))), t = h("<p/>").text(p.t("The Calculator is designed based on the Australian immunisation schedule. An individual vaccinated overseas may have received vaccines that contain antigens not recognised by the Calculator. Therefore the Calculator will not be able to accurately determine the validity of the vaccines administered to date.")), f.append(t), t = h("<p/>").text(p.t("People who have been vaccinated overseas may have received vaccines which are different to those recommended in the ")).append(p.theme("hyperlink", m.link_nip, "Australian National Immunisation Program", "_blank")).append("."), f.append(t), t = h("<p/>").text(p.t("For additional information, please refer to ")).append(p.theme("hyperlink", m.link_foreign_language_terms, "Foreign Language Terms", "_blank")).append(p.t(" to aid in  translating foreign immunisation records.")), f.append(t)), "Yes" !== d.getMedication() && "Not sure" !== d.getMedication() || (f.append(h("<h3/>").text(p.t("Medically at risk"))), t = h("<p/>").text(p.t("For individuals who are medically at risk refer to the Handbook to determine catch-up schedule or contact your ")).append(p.theme("hyperlink", m.link_immunisation_contacts, "local immunisation unit", "_blank")).append(p.t(" for further advice.")), f.append(t), t = h("<p/>").text(p.t("Please refer to ")).append(p.theme("hyperlink", m.link_catchup_vaccination, "Catch-up vaccination", "_blank")).append(p.t(" and ")).append(p.theme("hyperlink", m.link_special_risk_groups, "Vaccination for special risk groups", "_blank")).append("."), f.append(t)), g.append(p.theme("resetButton")), p.attachBehaviors(f.get(0))
    }
    p.theme.historyForm = function(n) {
        var e = h("<div/>", { class: "form-vaccines-entry form-wrapper" });
        n.heading && e.append(h("<h3/>").text(p.t(n.heading)));
        var t = n.date ? n.date : "",
            a = p.theme("textInput", p.t("Date of vaccination"), "calculator-date", t, { placeholder: "dd/mm/yyyy", autocomplete: "off" });
        e.append(a);
        var i = CalculatorVaccines.getVaccines(),
            o = [];
        h.each(i, function(e, t) { "antigen" === u ? o.push({ index: e, value: t.antigen_name, suffix: t.vaccine_name }) : o.push({ index: e, value: t.vaccine_name, suffix: t.antigen_name }) }), o.sort(function(e, t) { return e.value < t.value ? -1 : e.value > t.value ? 1 : 0 });
        var r = {},
            s = 0;
        h.each(o, function(e, t) {
            var a = { id: t.index, value: t.index, label: t.value, suffix: "(" + t.suffix + ")" };
            n.vaccines && -1 < n.vaccines.indexOf(t.index) && (a.checked = "checked"), r["checkAdministered" + s] = a, s++
        }), r["checkAdministered" + s] = { class: "pseudo-checkbox" }, r["checkAdministered" + s + 1] = { class: "pseudo-checkbox" };
        var c = { id: "check-administered", title: p.t("Select the @modes administered on the chosen date. Multiple @modes can be selected.", { "@mode": u }), options: r },
            l = p.theme("checkBoxes", c);
        e.append(l), e.append(p.theme("formStorage", n));
        var d = p.theme("actions");
        return d.append(p.theme("cancelLink")).append(p.theme("submitButton")), e.append(d), e
    }, p.theme.header = function(e) { return h("<h2/>").text(e) }, p.theme.actions = function() { return h("<div/>", { class: "form-actions form-wrapper" }) }, p.theme.navigationButtons = function(e, t) { var a = p.theme("actions"); return e && a.append(p.theme("previousButton", e)), t && ("Save PDF" === t ? a.append(p.theme("pdfButton", t)) : a.append(p.theme("nextButton", t))), a }, p.theme.previousButton = function(e) { return h("<a/>", { href: "", class: "link-previous" }).append(p.t(e)).click(previousButtonHandler) }, p.theme.nextButton = function(e) { return h("<input/>", { type: "submit", class: "form-submit button-primary button-next", value: p.t(e) }).click(nextButtonHandler) }, p.theme.submitButton = function() { return h("<input/>", { type: "submit", class: "form-submit button-primary button-submit", value: p.t("Submit") }).click(submitButtonHandler) }, p.theme.resetLink = function() { return h("<a/>", { href: "", class: "link-reset" }).append(p.t("Start over")).click(resetLinkHandler) }, p.theme.resetButton = function() { return h("<input/>", { type: "submit", class: "form-submit button-primary button-reset", value: p.t("Start over") }).click(resetLinkHandler) }, p.theme.pdfButton = function(e) { return h("<input/>", { type: "submit", class: "form-submit button-primary button-pdf", value: p.t(e) }).click(pdfButtonHandler) }, p.theme.hyperlink = function(e, t, a) { var n = {}; return n.href = e, a && (n.target = a), h("<a/>", n).append(p.t(t)) }, p.theme.editLink = function(e) { return h("<a/>", { href: "", identifier: e, class: "link-edit" }).append(p.t("Edit")).click(editButtonHandler) }, p.theme.removeLink = function(e) { return h("<a/>", { href: "", identifier: e, class: "link-remove" }).append(p.t("Remove")).click(removeButtonHandler) }, p.theme.cancelLink = function() { return h("<a/>", { href: "", class: "link-cancel" }).append(p.t("Cancel")).click(cancelButtonHandler) }, p.theme.textInput = function(e, t, a, n, i) {
        var o = { id: "edit-" + t, errorId: t, type: "text", class: "form-text", value: a };
        Object.keys(n).forEach(function(e) { o[e] = n[e] });
        var r = h("<div/>", { class: "form-item form-type-textfield" });
        return r.append(h("<label/>", { for: "edit-" + t }).text(e)), i && r.append(h("<div/>", { class: "form-item-preamble" }).append(i)), r.append(h("<input/>", o)), r
    }, p.theme.checkbox = function(e, t, a) { return h("<div/>", { class: "form-item form-type-checkbox" }).append(h("<label/>", { for: "edit-" + e }).append(h("<input/>", { id: "edit-" + e, errorId: e, type: "checkbox", checked: a, value: e, class: "form-checkbox" })).append(h("<span/>", { class: "input__text" }).text(t))) }, p.theme.checkBoxes = function(e) {
        var t = e.id,
            a = h("<div/>", { id: "edit-" + t, class: "form-checkboxes" });
        if ("preamble" in e) {
            var n = h("<div/>", { class: "form-item-preamble" }).append(e.preamble);
            a.append(n)
        }
        var i = { errorId: t, type: "checkbox", name: t, class: "form-checkbox" };
        for (var o in e.options) {
            if (e.options[o].id) {
                i.value = e.options[o].value, i.id = "edit-" + e.options[o].id, e.options[o].checked ? i.checked = "checked" : delete i.checked, e.options[o].solo && (i.solo = e.options[o].solo);
                var r = h("<div/>", { class: "form-item form-type-checkbox" }).append(h("<label/>", { for: i.id }).append(h("<input/>", i)).append(h("<span/>", { class: "input__text" }).text(e.options[o].label))),
                    s = e.options[o].suffix;
                s.length && r.append(h("<span/>", { class: "checkbox-suffix" }).text(s))
            } else r = h("<div/>", { class: e.options[o].class });
            a.append(r)
        }
        var c = h("<div/>", { class: "form-item form-item-" + t }).append(h("<label/>", { for: "edit-" + t }).text(e.title));
        return c.append(a), c
    }, p.theme.radios = function(e) {
        var t = e.id,
            a = h("<div/>", { id: "edit-" + t, class: "form-radios" });
        if ("preamble" in e) {
            var n = h("<div/>", { class: "form-item-preamble" }).append(e.preamble);
            a.append(n)
        }
        for (var i in e.options) {
            var o = e.options[i].id,
                r = e.options[i].checked,
                s = e.options[i].value,
                c = e.options[i].label,
                l = e.options[i].disabled,
                d = h("<div/>", { class: "uikit-control-input uikit-control-input--block" }),
                p = h("<input/>", { id: "edit-" + o, errorId: t, type: "radio", name: t, value: s, class: "uikit-control-input__input form-radio" });
            r && p.attr("checked", "checked"), l && p.attr("disabled", "true"), d.append(p), d.append(h("<label/>", { class: "uikit-control-input__text option", for: "edit-" + o }).text(c)), a.append(d)
        }
        var u = h("<div/>", { class: "form-item form-item-" + t }).append(h("<label/>", { for: "edit-" + t }).text(e.title));
        return u.append(a), u
    }, p.theme.select = function(e) {
        var t = e.id,
            a = h("<select/>", { id: "edit-" + t, errorId: t, class: "uikit-select__element form-select" });
        for (var n in e.options) {
            var i = e.options[n].label,
                o = e.options[n].selected,
                r = e.options[n].value,
                s = h("<option/>", { value: r }).append(i);
            o && s.attr("selected", "selected"), a.append(s)
        }
        var c = h("<div/>", { class: "form-item form-item-" + t }).append(h("<label/>", { for: "edit-" + t }).text(e.title));
        if ("preamble" in e) {
            var l = h("<div/>", { class: "form-item-preamble" }).append(e.preamble);
            c.append(l)
        }
        return c.append(h("<div/>", { class: "uikit-select" }).append(a)), c
    }, p.theme.formStorage = function(e) { return h("<input/>", { id: "calculator-form-storage", type: "hidden", value: JSON.stringify(e) }) }, p.theme.statusMessage = function(e, t, a) {
        var n;
        switch (e) {
            case "notice":
                n = p.t("Notice");
                break;
            case "warning":
                n = p.t("Warning");
                break;
            case "error":
                n = p.t("Error")
        }
        return h("<div/>", { role: "alert", errorId: a, class: "messages " + e }).text(t).prepend(h("<h2/>", { class: "element-invisible" }).text(p.t("@type message", { "@type": capitalise(n) })))
    }, p.theme.summaryDetails = function(e) {
        var t = h("<h2/>", { class: "user-name" }).text(e.getFirstName()),
            a = h("<div/>", { class: "user-dob" }).append(h("<span/>", { class: "user-label" }).text(p.t("Date of birth:"))).append(formattedDate(e.getDOB())),
            n = h("<div/>", { class: "user-gender" }).append(h("<span/>", { class: "user-label" }).text(p.t("Gender:"))).append(e.getGender()),
            i = h("<div/>", { class: "user-atsi" }).append(h("<span/>", { class: "user-label" }).text(p.t("Aboriginal or Torres Strait Islander:"))).append(e.getATSI()),
            o = h("<div/>", { class: "user-records" }).append(h("<span/>", { class: "user-label" }).text(p.t("Immunisation record(s) viewed:"))).append(e.getRecordsFormatted()),
            r = h("<div/>", { class: "user-medication" }).append(h("<span/>", { class: "user-label" }).text(p.t("Prescription immunosuppressive medication:"))).append(e.getMedication()),
            s = h("<div/>", { class: "user-state" }).append(h("<span/>", { class: "user-label" }).text(p.t("State:"))).append(e.getState()),
            c = h("<div/>", { class: "user-date-created" }).append(h("<span/>", { class: "user-label" }).text(p.t("Date created:"))).append(formattedDate(dateToString(today()))),
            l = h("<div/>", { class: "user-age" }).append(h("<span/>", { class: "user-label" }).text(p.t("Age:"))).append(e.formattedAge());
        return h("<div/>", { class: "user-personal-details" }).append(h("<div/>", { class: "user-personal-details-col-1" })).append(t).append(a).append(n).append(i).append(o).append(r).append(s).append(h("<div/>", { class: "user-personal-details-col-2" })).append(c).append(l)
    }, p.behaviors.calculator = {
        attach: function(e) {
            ! function init(e) {
                if (jQuery.ajax({ url: CatchupCalculatorDataFilesPath + "variables.json", dataType: "json", async: !1, cache: !1, success: function(e) { m = e }, error: function(e, t, a) { console.log("Error loading variables.json: " + a) } }), !n) {
                    n = !0, c = !(l = []), r = { exclusionsStep: { build: exclusionsStep, validate: exclusionsStepValidate, submit: exclusionsStepSubmit, class: "step-exclusion", stage: 1, gtm: { event: "virtualPageView", virtualPageURL: "/catch-up-calculator/pre-calculation-screening/", virtualPageTitle: "Pre-calculation screening" } }, personalInfoStep: { build: personalInfoStep, validate: personalInfoStepValidate, submit: personalInfoStepSubmit, previous: "exclusionsStep", class: "step-personal-info", stage: 2, gtm: { event: "virtualPageView", virtualPageURL: "/catch-up-calculator/personal-details/", virtualPageTitle: "Personal details" } }, entryModeStep: { build: entryModeStep, validate: entryModeStepValidate, submit: entryModeStepSubmit, previous: "personalInfoStep", class: "step-entry-mode", stage: 3, gtm: { event: "virtualPageView", virtualPageURL: "/catch-up-calculator/vaccination-history/", virtualPageTitle: "Vaccination history" } }, vaccineStep: { build: vaccineStep, validate: vaccineStepValidate, submit: vaccineStepStepSubmit, previous: "entryModeStep", class: "step-vaccine", stage: 3, gtm: { event: "virtualPageView", virtualPageURL: "/catch-up-calculator/vaccination-history-", virtualPageTitle: "Vaccination history 2" } }, confirmationStep: { build: confirmationStep, submit: confirmationStepSubmit, previous: "vaccineStep", class: "step-confirmation", stage: 3, gtm: { event: "virtualPageView", virtualPageURL: "/catch-up-calculator/confirm-details/", virtualPageTitle: "Confirm details" } }, resultsStep: { build: resultsStep, previous: "confirmationStep", class: "step-results", stage: 4, gtm: { event: "virtualPageView", virtualPageURL: "/catch-up-calculator/catch-up-schedule/", virtualPageTitle: "Catch-up schedule" } }, invalidUserStep: { build: invalidUserStep, class: "step-invalid", stage: 0, gtm: { event: "virtualPageView", virtualPageURL: "/catch-up-calculator/calculator-cannot-support/", virtualPageTitle: "Sorry, the calculator cannot support you at this time" } } }, v = h(e).find("#calculator-region-header"), i = h(e).find("#calculator-region-messages"), f = h(e).find("#calculator-region-content"), g = h(e).find("#calculator-region-buttons"), o = h(e).find("#calculator-region-footer"), d = new User;
                    var t = "exclusionsStep";
                    if (m.use_local_storage) {
                        var a = JSON.parse(localStorage.getItem("health.calculator") || "[]");
                        a.currentStep && (d.loadJSON(a), t = a.currentStep)
                    }
                    buildStep(t)
                }
            }(e),
            function formItemWatcher(e) { h(e).find(".form-text, .form-select, .form-radio, .form-checkbox").once("form-item-watcher", function() { h(this).change(formItemChangeHandler) }) }(e)
        }
    }, p.behaviors.soloCheckbox = { attach: function(e) { h('input[name="check-records"]').click(function(e) { h(this).attr("solo") ? h('input[name="check-records"][solo!="solo"]').prop("checked", !1) : h('input[name="check-records"][solo="solo"]').prop("checked", !1) }) } }, p.behaviors.onBeforeUnload = { attach: function(e, t) { window.onbeforeunload = function() { return "Are you sure you want to leave?" } } }, jQuery.browser = {}, jQuery.browser.msie = !1, jQuery.browser.version = 0, navigator.userAgent.match(/MSIE ([0-9]+)\./) && (jQuery.browser.msie = !0, jQuery.browser.version = RegExp.$1)
}(jQuery, Drupal);;
! function(t, e, i, a) {
    "use strict";
    e.facetapi && (e.facetapi.makeCheckbox = function() {
        var i = t(this),
            a = i.hasClass("facetapi-active"),
            c = t(this).parent("li");
        if (a || i.hasClass("facetapi-inactive")) {
            var n = this.id + "--checkbox",
                r = t('<label class="uikit-control-input" for="' + n + '"><div class="uikit-control-input__text"></div></label>'),
                s = t('<input type="checkbox" class="facetapi-checkbox uikit-control-input__input" id="' + n + '" />'),
                o = i.attr("href"),
                p = new e.facetapi.Redirect(o);
            s.click(function(t) { e.facetapi.disableFacet(i.parents("ul.facetapi-facetapi-checkbox-links")), p.gotoHref() }), r.prepend(s), c.prepend(r), a ? (i.remove(), r.find("div").text(c.text())) : (i.find(".element-invisible").remove(), r.find("div ").text(i.text()), i.remove()), c.contents().filter(function() { return 3 == this.nodeType }).first().replaceWith(""), a && s.attr("checked", !0)
        }
    })
}(jQuery, Drupal, 0, this.document);;