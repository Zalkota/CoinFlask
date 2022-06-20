<template>
        <svg :class="{'stroke-green svg': change >= 0, 'stroke-red svg': change < 0}" :width="width" :height="height" :stroke-width="stroke">
          <path class="sparkline--line" :d="shape" fill="none"></path>
          <path
            class="sparkline--fill"
            :d="[shape, fillEndPath].join(' ')"
            stroke="none"
          ></path>
        </svg>
</template>

<script>
export default {
   name: 'Sparkline',
  props: ["data", "change"],
  data() {
    return {
      stroke: 3,
      width: 150,
      height: 42,
    };
  },
  computed: {
    shape() {
      const stroke = this.stroke;
      const width = this.width;
      const height = this.height - stroke * 2;
      const data = this.data || [];
      const highestPoint = Math.max.apply(null, data);
      const coordinates = [];
      const totalPoints = this.data.length - 1;
      data.forEach((item, n) => {
        const x = (n / totalPoints) * width + stroke;
        const y = height - (item / highestPoint) * height + stroke;
        coordinates.push({ x, y });
      });
      if (!coordinates[0]) {
        return (
          "M 0 " +
          this.stroke +
          " L 0 " +
          this.stroke +
          " L " +
          this.width +
          " " +
          this.stroke
        );
      }
      const path = [];
      coordinates.forEach((point) =>
        path.push(["L", point.x, point.y].join(" "))
      );
      return ["M" + coordinates[0].x, coordinates[0].y, ...path].join(" ");
    },
    fillEndPath() {
      return `V ${this.height} L 4 ${this.height} Z`;
    },
  },
};
</script>

<style>

.stroke-red {
    stroke: #F56565;
}

.stroke-green {
    stroke: #68D391;
}
.svg {
  fill: rgba(255, 255, 255, 1);
  transition: all 1s ease-in-out;
  margin: 0px !important;
  padding-top: 2px;
}
svg path {
  box-sizing: border-box;
}
</style>
