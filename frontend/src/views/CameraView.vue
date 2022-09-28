<template>
  <div>
    <div id="interactive" class="viewport scanner">
      <video
        id="cameravid"
        :width="vw"
        :style="vidstyle"
      />
      <canvas class="drawingBuffer" />
    </div>
    <div id="background" />
    <div id="overlay">
      <div class="camera-button" />
      <p v-html="debug" />
    </div>
  </div>
</template>

<script>
// some of this code is copied from https://www.npmjs.com/package/vue-quaggajs
import Quagga from "@ericblade/quagga2";

export default {
    data: function () {
        return {
            vh: null,
            vw: null,
            vidstyle: {},
            debug: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique libero quia eveniet animi exercitationem ipsum reiciendis molestiae maxime! Quia, facilis libero iure delectus rerum veniam. Laboriosam provident ea fugit commodi?",
        };
    },
    mounted: async function () {
        try {
            await document.documentElement.requestFullscreen();
        } catch (e) {
            this.debug = e;
            // this.$router.push({ name: "Fullscreen" });
        }
        this.vh = Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0,
        );
        this.vw = Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0,
        );
        Quagga.init(
            {
                inputStream: {
                    type: "LiveStream",
                    constraints: {
                        width: { ideal: 1920 },
                        height: { ideal: 1080 },
                        facingMode: "environment",
                        aspectRatio: {
                            ideal: this.vh / this.vw,
                        },
                    },
                },
                // locator: {
                //     patchSize: "medium",
                //     halfSample: true,
                // },
                frequency: 5,
                decoder: {
                    readers: ["code_128_reader"],
                },
                locate: false,
            },
            this.quaggainit,
        );
        Quagga.onDetected(this.onDetected);
    },
    unmounted: async function () {
        if (this.onDetected) Quagga.offDetected(this.onDetected);
        Quagga.stop();
        try {
            await document.exitFullscreen();
        } catch (e) {
            console.log("already exited fullscreen");
        }
    },
    methods: {
        onDetected(result) {
            console.log("detected: ", result);
        },
        quaggainit(err) {
            if (err) {
                return console.error(err);
            }
            this.vidstyle = {
                top:
                    (this.vh -
                        document.getElementById("cameravid").clientHeight) /
                        2 +
                    "px",
            };
            Quagga.start();
        },
    },
};
</script>

<style scoped>
.viewport {
  position: relative;
  z-index: 0;
}

#overlay {
  z-index: 1;
}

.viewport video {
  position: absolute;
  left: 0;
  top: 50%;
  /* transform: translate(0, -50%); */
}

.drawingBuffer {
  display: none;
}

#background,
#overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#background {
  background-color: #000000;
  z-index: -1;
}

.camera-button {
  background-color: #ffffff;
  position: absolute;
  width: 5rem;
  height: 5rem;
  border-radius: 2.5rem;
  bottom: 3rem;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
