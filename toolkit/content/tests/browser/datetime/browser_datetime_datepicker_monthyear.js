/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

/**
 * Ensure the month-year panel of a date input handles Space and Enter appropriately.
 */
add_task(async function test_monthyear_close_date() {
  info(
    "Ensure the month-year panel of a date input handles Space and Enter appropriately."
  );

  const inputValue = "2022-11-11";

  await helper.openPicker(
    `data:text/html, <input type="date" value=${inputValue}>`
  );
  let pickerDoc = helper.panel.querySelector("#dateTimePopupFrame")
    .contentDocument;

  // Move focus from the selected date to the month-year toggle button:
  await EventUtils.synthesizeKey("KEY_Tab", { repeat: 2 });

  // Test a month spinner
  await testKeyOnSpinners("KEY_Enter", pickerDoc);
  await testKeyOnSpinners(" ", pickerDoc);

  // Test a year spinner
  await testKeyOnSpinners("KEY_Enter", pickerDoc, 2);
  await testKeyOnSpinners(" ", pickerDoc, 2);

  await helper.tearDown();
});

/**
 * Ensure the month-year panel of a datetime-local input handles Space and Enter appropriately.
 */
add_task(async function test_monthyear_close_datetime() {
  info(
    "Ensure the month-year panel of a datetime-local input handles Space and Enter appropriately."
  );

  const inputValue = "2022-11-11T11:11";

  await helper.openPicker(
    `data:text/html, <input type="datetime-local" value=${inputValue}>`
  );
  let pickerDoc = helper.panel.querySelector("#dateTimePopupFrame")
    .contentDocument;

  // Move focus from the selected date to the month-year toggle button:
  await EventUtils.synthesizeKey("KEY_Tab", { repeat: 2 });

  // Test a month spinner
  await testKeyOnSpinners("KEY_Enter", pickerDoc);
  await testKeyOnSpinners(" ", pickerDoc);

  // Test a year spinner
  await testKeyOnSpinners("KEY_Enter", pickerDoc, 2);
  await testKeyOnSpinners(" ", pickerDoc, 2);

  await helper.tearDown();
});

/**
 * Ensure the month-year panel of a date input can be closed with Escape key.
 */
add_task(async function test_monthyear_escape_date() {
  info("Ensure the month-year panel of a date input can be closed with Esc.");

  const inputValue = "2022-12-12";

  await helper.openPicker(
    `data:text/html, <input type="date" value=${inputValue}>`
  );
  let pickerDoc = helper.panel.querySelector("#dateTimePopupFrame")
    .contentDocument;

  // Move focus from the today's date to the month-year toggle button:
  EventUtils.synthesizeKey("KEY_Tab", { repeat: 2 });

  // Test a month spinner
  await testKeyOnSpinners("KEY_Escape", pickerDoc);

  // Test a year spinner
  await testKeyOnSpinners("KEY_Escape", pickerDoc, 2);

  await helper.tearDown();
});

/**
 * Ensure the month-year panel of a datetime-local input can be closed with Escape key.
 */
add_task(async function test_monthyear_escape_datetime() {
  info(
    "Ensure the month-year panel of a datetime-local input can be closed with Esc."
  );

  const inputValue = "2022-12-12";

  await helper.openPicker(
    `data:text/html, <input type="date" value=${inputValue}>`
  );
  let pickerDoc = helper.panel.querySelector("#dateTimePopupFrame")
    .contentDocument;

  // Move focus from the today's date to the month-year toggle button:
  EventUtils.synthesizeKey("KEY_Tab", { repeat: 2 });

  // Test a month spinner
  await testKeyOnSpinners("KEY_Escape", pickerDoc);

  // Test a year spinner
  await testKeyOnSpinners("KEY_Escape", pickerDoc, 2);

  await helper.tearDown();
});
