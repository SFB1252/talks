#set page(width: 210mm, height: 297mm, margin: (x: 12mm, y: 12mm), fill: white)
#set text(font: "Albert Sans", size: 10pt, fill: rgb("102631"))
#set par(justify: false)

#let uzk-blue = rgb("005176")
#let uzk-blue-dark = rgb("003d59")
#let uzk-turquoise = rgb("009dcc")
#let uzk-muted = rgb("547685")
#let light = rgb("f4fafc")

#let session-card(title, month, day, speaker, height: 27mm) = block(
  width: 100%, height: height, inset: 7pt, stroke: 0.8pt + uzk-muted,
  fill: white, radius: 0pt,
)[
  #grid(
    columns: (1fr, 48pt), gutter: 8pt, align: (left, top),
    [
      #text(size: 11.6pt, weight: "bold", style: "italic")[#title]
      #v(5pt)
      #text(size: 8.6pt, fill: uzk-muted)[#speaker]
    ],
    [
      #align(right + top)[
        #text(size: 19pt, weight: "bold", fill: uzk-blue-dark)[#month]
        #linebreak()
        #text(size: 29pt, weight: "bold", fill: uzk-blue-dark)[#day]
      ]
    ],
  )
]

#let info-cell(title, body) = block(inset: 8pt, width: 100%)[
  #text(size: 13.5pt, weight: "bold", fill: uzk-blue)[#title]
  #v(4pt)
  #text(size: 10.8pt, fill: uzk-blue)[#body]
]

#place(bottom + left, dx: -18mm, dy: 28mm)[
  #circle(radius: 48mm, stroke: 1pt + uzk-turquoise)
]

#place(bottom + left, dx: 4mm, dy: 24mm)[
  #rotate(-22deg)[
    #stack(spacing: 3pt)[
      #line(length: 68mm, stroke: 0.45pt + uzk-turquoise)
      #line(length: 74mm, stroke: 0.45pt + uzk-turquoise)
      #line(length: 80mm, stroke: 0.45pt + uzk-turquoise)
      #line(length: 86mm, stroke: 0.45pt + uzk-turquoise)
      #line(length: 92mm, stroke: 0.45pt + uzk-turquoise)
    ]
  ]
]

#place(top + right, dx: -5mm, dy: 8mm)[
  #rotate(35deg)[
    #stack(spacing: 3pt)[
      #line(length: 34mm, stroke: 0.45pt + uzk-turquoise)
      #line(length: 40mm, stroke: 0.45pt + uzk-turquoise)
      #line(length: 46mm, stroke: 0.45pt + uzk-turquoise)
      #line(length: 52mm, stroke: 0.45pt + uzk-turquoise)
      #line(length: 58mm, stroke: 0.45pt + uzk-turquoise)
      #line(length: 64mm, stroke: 0.45pt + uzk-turquoise)
      #line(length: 70mm, stroke: 0.45pt + uzk-turquoise)
    ]
  ]
]

#block[
  #text(size: 17pt, weight: "bold")[SFB 1252 Prominence in Language]
  #linebreak()
  #text(size: 32pt, weight: "bold", fill: uzk-blue)[RDM: Research Data & Methods]
  #linebreak()
  #v(2pt)
  #text(size: 15pt)[Winter 2026-27 | September - January]
  #linebreak()
  #text(size: 12.8pt)[Introductory sessions and discussions]
  #linebreak()
  #text(size: 12.8pt)[Organized by Project S, CRC 1252]
  #linebreak()
  #text(size: 12.8pt)[Contact: job.schepens (at) uni-koeln.de]
]

#v(9pt)

#grid(
  columns: (1fr, 1fr), column-gutter: 6pt, row-gutter: 6pt,
  session-card([SMLP 2026 Recap Discussion], [Sep], [16], [Job Schepens]),
  session-card([lme4 Model Criticism], [Sep], [30], [Job Schepens]),
  session-card([Data Management Plans in Practice], [Oct], [14], [Lukas Lammers]),
  session-card([Backups], [Nov], [04], [Speaker: TBC]),
  session-card([Data Visualization with ggplot2], [Nov], [18], [Job Schepens]),
  session-card([Data Visualization with Other Tools], [Dec], [02], [Job Schepens]),
  session-card([Data Protection: GDPR, Sciebo, and Encryption], [Jan], [06], [Job Schepens]),
  session-card([Open Debugging: Bring Your Own Problem], [Jan], [20], [Speaker: TBC]),
)

#v(7pt)

#block(width: 100%, inset: 0pt, stroke: 1.2pt + uzk-turquoise, fill: light)[
  #grid(
    columns: (1fr, 1fr, 1fr), gutter: 8pt,
    info-cell([Where?], [Attic (top floor), House of Prominence]),
    info-cell([When?], [Wednesdays, 14:00 - 15:30]),
    info-cell([Who?], [All CRC members and their guests]),
  )
]

#v(8pt)

#align(right + bottom)[
  #grid(
    columns: (auto, auto, auto), gutter: 9pt, align: (right, bottom),
    [#image("../../logo.png", width: 38mm)],
    [#image("img/uzk-logo.png", width: 22mm)],
    [#image("../2026_rdm-flyer_summer-semester/img/qrcode.png", width: 24mm)],
  )
]