function dopDots(t) {
    let e = t.canvas,
      i = t,
      l = document.querySelector(e.dataset.elementformousemove);
    function a(t, l) {
      let a = e.dataset.margin,
        n = a / 2,
        s = parseInt(e.dataset.elementsize, 10),
        o = e.dataset.color,
        r = parseInt(e.dataset.moveradius, 10),
        f = e.dataset.secondcolor || "#ff0",
        d = parseInt(e.dataset.startangle, 10) || 0,
        h = parseInt(e.dataset.endangle, 10) || 2 * Math.PI;
      i.clearRect(0, 0, e.width, e.height);
      for (let c = 1; c < e.height / a; c++)
        for (let g = 0; g < e.width / a + n; g++) {
          let P = g * a + n,
            u = c * a + n;
          g * a + n > t - r && g * a + n < t + r && c * a > l - r && c * a < l + r
            ? (i.beginPath(), i.arc(P, u, s, d, h), (i.fillStyle = f), i.fill())
            : (i.beginPath(), i.arc(P, u, s, d, h), (i.fillStyle = o), i.fill());
        }
    }
    if (e.width && e.height) {
      if ("grid" === e.dataset.type) a(1, 1);
      else if ("line" === e.dataset.type) {
        let n = JSON.parse(e.dataset.manifest);
        if ("y" === n.lineDirection) {
          let s = (e.height - n.startPoint.y) / marginOfElements;
          if ("fullHeight" === n.endPoint)
            for (let o = 0; o < s; o++) {
              let r = n.startPoint.y + o * marginOfElements;
              i.beginPath(),
                i.arc(n.startPoint.x, r, elementSize, 0, 2 * Math.PI),
                (i.fillStyle = elementsColor),
                i.fill();
            }
        } else if ("x" === n.lineDirection) {
          let f = (e.width - n.startPoint.x) / marginOfElements;
          if ("fullWidth" === n.endPoint)
            for (let d = 0; d < f; d++) {
              let h = n.startPoint.x + d * marginOfElements;
              i.beginPath(),
                i.arc(h, n.startPoint.y, elementSize, 0, 2 * Math.PI),
                (i.fillStyle = elementsColor),
                i.fill();
            }
        }
      }
    } else throw "Canvas should have width and height";
    l &&
      !l.getAttribute("listener") &&
      (l.addEventListener("mousemove", function t(e) {
        a(e.offsetX, e.offsetY);
      }),
      l.setAttribute("listener", "true"));
  }