/**
 * Google Apps Script — kirim ucapan undangan ke Gmail.
 *
 * Cara pasang / update:
 * 1. Login ke akun Google yang akan mengirim email (boleh akun mana saja)
 * 2. Buka https://script.google.com → buka project undangan (atau New project)
 * 3. Tempel SEMUA kode di file ini, ganti isi lama
 * 4. Deploy → Manage deployments → Edit (pensil) → Version: New version → Deploy
 *    (atau Deploy → New deployment → Type: Web app
 *     - Execute as: Me
 *     - Who has access: Anyone)
 * 5. Pastikan Web App URL sama dengan weddingData.ts → appsScriptUrl
 *    (jika URL berubah, update appsScriptUrl)
 */

var TO_EMAIL = 'arshiellistamuhammad@gmail.com'

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents)
    var name = String(data.name || '').trim()
    var message = String(data.message || '').trim()
    var to = String(data.to || TO_EMAIL).trim() || TO_EMAIL

    if (!name || !message) {
      return json_({ success: false, message: 'Nama dan ucapan wajib diisi' })
    }

    MailApp.sendEmail({
      to: to,
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
  return json_({ ok: true, service: 'undangan-wishes', to: TO_EMAIL })
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
