"""
Rimuove i disegni colorati dallo sfondo di tondo_gabriele1.png
e salva il risultato in tondo_gabriele2.png.
Usa GrabCut per separare la persona dallo sfondo, poi inpaint
solo i pixel di sfondo con colori vivaci / disegni.
"""
import cv2
import numpy as np

IMG_IN  = r"public/asset/images/tondo_gabriele1.png"
IMG_OUT = r"public/asset/images/tondo_gabriele2.png"

img = cv2.imread(IMG_IN)
assert img is not None, f"Impossibile leggere {IMG_IN}"
h, w = img.shape[:2]

# ── STEP 1: GrabCut — separa persona da sfondo ────────────────────────────────
gc_mask   = np.zeros((h, w), np.uint8)
bgd_model = np.zeros((1, 65), np.float64)
fgd_model = np.zeros((1, 65), np.float64)
rect = (20, 5, w - 40, h - 8)   # rettangolo attorno alla persona
cv2.grabCut(img, gc_mask, rect, bgd_model, fgd_model, 10, cv2.GC_INIT_WITH_RECT)
# fg_mask = 1 dove c'è persona, 0 dove c'è sfondo
fg_mask = np.where((gc_mask == 2) | (gc_mask == 0), 0, 1).astype(np.uint8)
# Erodi leggermente il fg per allontanare l'inpainting dalla persona
fg_mask = cv2.erode(fg_mask, np.ones((5, 5), np.uint8), iterations=3)
bg_mask = (1 - fg_mask)  # 1 = sfondo

# ── STEP 2: Maschere colore per i disegni ─────────────────────────────────────
hsv  = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
h_ch = hsv[:, :, 0]   # hue  0-180
s    = hsv[:, :, 1]   # sat  0-255
v    = hsv[:, :, 2]   # val  0-255

# Arancio vivace del murale
m_orange = ((h_ch >= 4) & (h_ch <= 22) & (s > 140) & (v > 60)).astype(np.uint8)
# Teal / ciano
m_teal   = ((h_ch >= 78) & (h_ch <= 112) & (s > 90)).astype(np.uint8)
# Pallini e altri colori vivaci (sat molto alta)
m_vivid  = (s > 155).astype(np.uint8)
# Nota musicale: linee scure sul lato sinistro (qualunque altezza)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
roi_left = np.zeros((h, w), dtype=np.uint8)
roi_left[:, : int(w * 0.45)] = 1          # tutta la parte sinistra
m_note = ((gray < 100) & (roi_left == 1)).astype(np.uint8)

# Unisci le maschere disegni
m_drawings = np.clip(m_orange + m_teal + m_vivid + m_note, 0, 1).astype(np.uint8)

# Applica solo dove c'è sfondo (non persona)
inpaint_mask = (m_drawings & bg_mask).astype(np.uint8)

# Dilata per coprire bordi sfumati
kernel = np.ones((5, 5), np.uint8)
inpaint_mask = cv2.dilate(inpaint_mask, kernel, iterations=2)

# ── STEP 3: Inpainting ───────────────────────────────────────────────────────
result = cv2.inpaint(img, inpaint_mask, inpaintRadius=25, flags=cv2.INPAINT_TELEA)

cv2.imwrite(IMG_OUT, result)
print(f"Salvato: {IMG_OUT}")

