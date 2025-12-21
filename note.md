- About page (flag: all done)
- techstack (flag: all done)
- urls (flag: all done)
- recheck (llms), layouts, persona,resume and project details (flag: all done)
- og images
- create a keyboard control cmd+k then a b c for others etc (flag: all done)
- show more/all button which will redirect to particular route (flag: all done)

curl -H "Content-Type: application/json" \
  https://ogimage.click/api/v1/images \
  -d '{
  "name": "og:basic",
  "params": {
    "title": {
      "text": "Aman Singh ",
      "fontFamily": "fira-mono",
      "fontWeight": 500,
      "fontSize": 52,
      "color": "#f9fafb"
    },
    "description": {
      "text": "Full Stack | DevOps | Engineer",
      "fontFamily": "jetbrains-mono",
      "fontWeight": 400,
      "fontSize": 30,
      "color": "#f3f4f6"
    },
    "logo": {
      "url": ""
    }
  },
  "background": {
    "type": "linear-gradient",
    "colorStops": [
      "#434343 0%",
      "black 100%"
    ],
    "direction": "to top",
    "noise": 0.15
  },
  "canvas": {
    "width": 1200,
    "height": 630
  }
}' > image.png