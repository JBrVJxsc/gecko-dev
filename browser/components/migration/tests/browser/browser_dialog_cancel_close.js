/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */

"use strict";

/**
 * Tests that pressing "Cancel" from the selection page of the migration
 * dialog closes the dialog when opened in about:preferences as a subdialog.
 */
add_task(async function test_cancel_close() {
  await withMigrationWizardSubdialog(async subdialogWin => {
    let dialogBody = subdialogWin.document.body;
    let wizard = dialogBody.querySelector("#wizard");
    let shadow = wizard.openOrClosedShadowRoot;
    let cancelButton = shadow.querySelector(
      'div[name="page-selection"] .cancel-close'
    );
    let dialogClosed = BrowserTestUtils.waitForEvent(window, "dialogclose");
    cancelButton.click();
    await dialogClosed;
    Assert.ok(true, "Clicking the cancel button closed the dialog.");
  });
});

/**
 * Tests that pressing "Cancel" from the selection page of the migration
 * dialog closes the dialog when opened in stand-alone window.
 */
add_task(async function test_cancel_close() {
  let promiseWinLoaded = BrowserTestUtils.domWindowOpened().then(win => {
    return BrowserTestUtils.waitForEvent(win, "MigrationWizard:Ready");
  });

  let win = Services.ww.openWindow(
    window,
    DIALOG_URL,
    "_blank",
    "dialog,centerscreen",
    { onResize: () => {} }
  );
  await promiseWinLoaded;

  win.sizeToContent();
  let wizard = win.document.querySelector("#wizard");
  let shadow = wizard.openOrClosedShadowRoot;
  let cancelButton = shadow.querySelector(
    'div[name="page-selection"] .cancel-close'
  );

  let windowClosed = BrowserTestUtils.windowClosed(win);
  cancelButton.click();
  await windowClosed;
  Assert.ok(true, "Window was closed.");
});
