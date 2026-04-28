#set page(
  width: 210mm,
  height: 297mm,
  margin: (x: 12mm, y: 12mm),
  fill: white,
)

#set text(
  font: "Albert Sans",
  size: 10pt,
  fill: rgb("102631"),
)
#set par(justify: false)

#let uzk-blue = rgb("005176")
#let uzk-blue-dark = rgb("003d59")
#let uzk-blue-light = rgb("006a9a")
#let uzk-turquoise = rgb("009dcc")
#let uzk-coral = rgb("ea564f")
#let uzk-text = rgb("102631")
#let uzk-muted = rgb("547685")
#let light = rgb("f4fafc")
#let dark = uzk-text

#let session-card(title, month, day, speaker: "Host: TBC", height: 28mm) = block(
  width: 100%,
  height: height,
  inset: 7pt,
  stroke: 0.8pt + uzk-muted,
  fill: white,
  radius: 0pt,
)[
  #grid(
    columns: (1fr, 48pt),
    gutter: 8pt,
    align: (left, top),
    [
      #text(size: 12.6pt, weight: "bold", style: "italic")[#title]

      #v(6pt)
      #text(size: 8.8pt, fill: uzk-muted)[#speaker]
    ],
    [
      #align(right + top)[
        #text(size: 20pt, weight: "bold", fill: uzk-blue-dark)[#month]
        #linebreak()
        #text(size: 31pt, weight: "bold", fill: uzk-blue-dark)[#day]
      ]
    ],
  )
]

#let info-cell(title, body) = block(
  inset: 8pt,
  width: 100%,
)[ 
  #text(size: 13.5pt, weight: "bold", fill: uzk-blue)[#title]
  #v(4pt)
  #text(size: 10.8pt, fill: uzk-blue)[#body]
]

#place(bottom + left, dx: -18mm, dy: 28mm)[
  #circle(radius: 48mm, stroke: 1pt + uzk-turquoise)
]

#stack(spacing: 3pt)[
  #text(size: 17pt, weight: "bold")[SFB 1252 Prominence in Language]

  #text(size: 32pt, weight: "bold", fill: uzk-blue)[Research Data & Methods]

  #text(size: 19pt, weight: "bold")[Bi-weekly Talks & Tutorials]

  #v(2pt)
  #block[
    #text(size: 15pt)[Summer 2026 | May - July]
    #linebreak()
    #text(size: 12.8pt)[Short introductions + hands-on work with existing resources]
    #linebreak()
    #text(size: 12.8pt)[Organized by Job Schepens & Luke Günther, Project S]
    #linebreak()
    #text(size: 12.8pt)[Contact: job.schepens (at) uni-koeln.de]
  ]
]

#v(10pt)

#grid(
  columns: (1fr, 1fr),
  column-gutter: 6pt,
  row-gutter: 6pt,
  session-card(
    [Version Control I: Getting Started with Git, GitHub, and gitlab.nrw],
    [May],
    [06],
  ),
  session-card(
    [Version Control II: Collaboration Workflows with GitHub and gitlab.nrw],
    [May],
    [20],
  ),
  session-card(
    [LaTeX I: Getting Started with Academic Writing in LaTeX],
    [Jun],
    [03],
  ),
  session-card(
    [LaTeX II: Longer Documents, Collaboration, and Thesis Workflows],
    [Jun],
    [17],
  ),
  session-card(
    [1 July Session Cancelled due to thesis defence and A.r.t.e.s. event],
    [Jul],
    [01],
    speaker: [Cancelled],
  ),
  session-card(
    [Licensing of Published Datasets and Scripts],
    [Jul],
    [15],
  ),
)

#v(7pt)

#block(
  width: 100%,
  inset: 0pt,
  stroke: 1.2pt + uzk-turquoise,
  fill: light,
)[
  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 8pt,
    info-cell(
      [Where?],
      [Spitzboden (attic)\
House of Prominence],
    ),
    info-cell(
      [When?],
      [Every other Wednesday\
14:00 - 15:30],
    ),
    info-cell(
      [Who?],
      [All CRC members\
and their guests],
    ),
  )
]

#v(8pt)

#align(right + bottom)[
  #grid(
    columns: (auto, auto, auto),
    gutter: 9pt,
    align: (right, bottom),
    [
      #image("../../logo.png", width: 38mm)
    ],
    [
      #image("img/dch-logo.png", width: 22mm)
    ],
    [
      #image("img/qrcode.png", width: 24mm)
    ],
  )
]
