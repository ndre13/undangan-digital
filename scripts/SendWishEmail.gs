/**
 * Google Apps Script — kirim ucapan undangan ke Gmail.
 *
 * Cara pasang (sekali saja):
 * 1. Login ke alakad261026@gmail.com
 * 2. Buka https://script.google.com → New project
 * 3. Hapus isi default, tempel SEMUA kode di file ini
 * 4. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Salin Web App URL, tempel ke weddingData.ts → appsScriptUrl
 */

var TO_EMAIL = 'alakad261026@gmail.com'

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents)
    var name = String(data.name || '').trim()
    var message = String(data.message || '').trim()

    if (!name || !message) {
      return json_({ success: false, message: 'Nama dan ucapan wajib diisi' })
    }

    MailApp.sendEmail({
      to: TO_EMAIL,
      subject: 'Ucapan Undangan — ' + name,
      body:
        'Nama: ' +
        name +
        '\n\nUcapan:\n' +
        message +
        '\n\n— Dikirim dari form undangan digital',
    })

    return json_({ success: true })
  } catch (err) {
    return json_({ success: false, message: String(err) })
  }
}

function doGet() {
  return json_({ ok: true, service: 'undangan-wishes' })
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
