import os
from PIL import Image, ImageDraw, ImageFont

def create_card():
    width = 1200
    height = 680
    
    # 1. Base canvas: deep obsidian velvet
    im = Image.new('RGB', (width, height), (8, 6, 12)) # #08060c
    draw = ImageDraw.Draw(im)
    
    # Gold Palette
    gold_bright = (245, 222, 179) # #f5deb3
    gold_primary = (212, 175, 55) # #d4af37
    gold_dark = (140, 105, 30)
    gold_frame = (180, 140, 45, 180)
    zinc_text = (190, 185, 195)
    zinc_dim = (140, 135, 145)
    
    # Outer Decorative Frames
    m1 = 28
    draw.rounded_rectangle([m1, m1, width - m1, height - m1], radius=32, outline=gold_primary, width=3)
    m2 = 40
    draw.rounded_rectangle([m2, m2, width - m2, height - m2], radius=24, outline=gold_dark, width=1)
    
    # Corner diamonds
    for cx, cy in [(m2 + 10, m2 + 10), (width - m2 - 10, m2 + 10), (m2 + 10, height - m2 - 10), (width - m2 - 10, height - m2 - 10)]:
        draw.polygon([(cx, cy - 6), (cx + 6, cy), (cx, cy + 6), (cx - 6, cy)], fill=gold_bright)

    # Fonts
    try:
        font_logo = ImageFont.truetype("timesbd.ttf", 46)
        font_sub = ImageFont.truetype("arialbd.ttf", 16)
        font_tag = ImageFont.truetype("arial.ttf", 15)
        font_qr_title = ImageFont.truetype("arialbd.ttf", 18)
        font_qr_sub = ImageFont.truetype("arial.ttf", 13)
        font_contacts = ImageFont.truetype("arialbd.ttf", 16)
        font_badge = ImageFont.truetype("arialbd.ttf", 12)
    except:
        font_logo = font_sub = font_tag = font_qr_title = font_qr_sub = font_contacts = font_badge = ImageFont.load_default()

    # Load Logo & Paste on Left
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    logo_path = os.path.join(base_dir, 'public', 'logo.png')
    if os.path.exists(logo_path):
        logo_im = Image.open(logo_path).convert('RGBA').resize((130, 130), Image.Resampling.LANCZOS)
        im.paste(logo_im, (70, 70), logo_im)

    # Left Header Texts
    text_x = 220
    draw.text((text_x, 75), "ROVY STORE", fill=gold_bright, font=font_logo)
    draw.text((text_x, 135), "HAUTE PARFUMERIE BOUTIQUE", fill=gold_primary, font=font_sub)
    draw.text((text_x, 162), "Exclusive Designer, Authentic Testers & Inspired Niche Fragrances", fill=zinc_text, font=font_tag)

    # VIP Badge
    badge_x = width - 260
    draw.rounded_rectangle([badge_x, 75, width - 70, 115], radius=12, fill=(28, 22, 34), outline=gold_primary, width=2)
    draw.text((badge_x + 22, 87), "VIP LUXURY CARD", fill=gold_bright, font=font_badge)

    # Divider Line
    draw.line([70, 225, width - 70, 225], fill=gold_dark, width=1)
    draw.polygon([(width//2, 221), (width//2 + 5, 225), (width//2, 229), (width//2 - 5, 225)], fill=gold_primary)

    # QR Codes Section (Two Cards Side by Side)
    web_qr_path = os.path.join(base_dir, 'public', 'rovy-store-web-qr.png')
    apk_qr_path = os.path.join(base_dir, 'public', 'rovy-store-apk-qr.png')
    
    qr_w, qr_h = 200, 200
    
    # Box 1: Website QR (Left Center)
    box1_x1, box1_y1 = 110, 260
    box1_w, box1_h = 460, 260
    draw.rounded_rectangle([box1_x1, box1_y1, box1_x1 + box1_w, box1_y1 + box1_h], radius=20, fill=(16, 12, 22), outline=gold_dark, width=1)
    
    if os.path.exists(web_qr_path):
        qr1_img = Image.open(web_qr_path).convert('RGB').resize((190, 190), Image.Resampling.LANCZOS)
        # White border around QR
        draw.rounded_rectangle([box1_x1 + 25, box1_y1 + 35, box1_x1 + 25 + 190, box1_y1 + 35 + 190], radius=10, fill=(255, 255, 255))
        im.paste(qr1_img, (box1_x1 + 25, box1_y1 + 35))
    
    # Text inside Box 1
    t1_x = box1_x1 + 235
    draw.text((t1_x, box1_y1 + 55), "ONLINE STORE", fill=gold_primary, font=font_sub)
    draw.text((t1_x, box1_y1 + 85), "زيارة المتجر الإلكتروني", fill=gold_bright, font=font_qr_title)
    draw.text((t1_x, box1_y1 + 120), "تصفح أفخم العطور\nوالشراء بضغطة زر\nالدفع عند الاستلام", fill=zinc_text, font=font_qr_sub)
    draw.text((t1_x, box1_y1 + 195), "rovy-store.vercel.app", fill=gold_primary, font=font_qr_sub)

    # Box 2: APK Download QR (Right Center)
    box2_x1 = 630
    draw.rounded_rectangle([box2_x1, box1_y1, box2_x1 + box1_w, box1_y1 + box1_h], radius=20, fill=(16, 12, 22), outline=gold_dark, width=1)

    if os.path.exists(apk_qr_path):
        qr2_img = Image.open(apk_qr_path).convert('RGB').resize((190, 190), Image.Resampling.LANCZOS)
        draw.rounded_rectangle([box2_x1 + 25, box1_y1 + 35, box2_x1 + 25 + 190, box1_y1 + 35 + 190], radius=10, fill=(255, 255, 255))
        im.paste(qr2_img, (box2_x1 + 25, box1_y1 + 35))

    # Text inside Box 2
    t2_x = box2_x1 + 235
    draw.text((t2_x, box1_y1 + 55), "ANDROID APP (APK)", fill=(80, 220, 140), font=font_sub)
    draw.text((t2_x, box1_y1 + 85), "تحميل تطبيق الأندرويد", fill=gold_bright, font=font_qr_title)
    draw.text((t2_x, box1_y1 + 120), "تطبيق أصلي سريع\nإشعارات فورية بالعروض\nطلب مباشر وسهل", fill=zinc_text, font=font_qr_sub)
    draw.text((t2_x, box1_y1 + 195), "rovy-store.apk (v1.0.0)", fill=(80, 220, 140), font=font_qr_sub)

    # Bottom Contact Bar
    draw.line([70, 560, width - 70, 560], fill=gold_dark, width=1)
    
    # 3 Contacts items
    cy = 590
    draw.text((120, cy), "Hotline & WhatsApp: 01010568615", fill=gold_bright, font=font_contacts)
    draw.text((560, cy), "Instagram: @rovystore2", fill=gold_bright, font=font_contacts)
    draw.text((880, cy), "Cairo & Zayed • All Egypt", fill=zinc_text, font=font_contacts)

    # Secondary Tagline
    draw.text((width // 2 - 190, 625), "ضمان الفحص والتجربة قبل الدفع • ثبات يدوم طويلاً", fill=gold_primary, font=font_qr_sub)

    # Save to public and to artifact dir
    out_public = os.path.join(base_dir, 'public', 'rovy-store-official-card.png')
    im.save(out_public, 'PNG')
    print(f"Saved: {out_public}")

    # Copy to artifacts directory
    artifact_dir = r"C:\Users\Dr Princa\.gemini\antigravity\brain\2d9d53fe-6b03-4ac8-8878-725378cea44d"
    out_artifact = os.path.join(artifact_dir, 'rovy-store-official-card.png')
    im.save(out_artifact, 'PNG')
    print(f"Saved to artifact dir: {out_artifact}")

if __name__ == '__main__':
    create_card()
