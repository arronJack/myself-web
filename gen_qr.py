import qrcode
from qrcode.image.svg import SvgPathImage

vcard = """BEGIN:VCARD
VERSION:3.0
N:郑;志能;;;
FN:郑志能
TITLE:AI 产品 / 全栈工程师 · 认知智能体方向
TEL;TYPE=CELL:+8613679769132
EMAIL:625955122@qq.com
URL:https://github.com/arronJack
NOTE:微信 Zenojack · 公众号：PASM 认知引擎 · 扫码联系郑志能
END:VCARD"""

qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_M,
    box_size=10,
    border=2,
)
qr.add_data(vcard)
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white", factory=SvgPathImage)
out = r"C:/Users/xiaozhi/WorkBuddy/2026-10-27-10-10-47/assets/img/contact-qr.svg"
img.save(out)
print("qr saved ->", out)
