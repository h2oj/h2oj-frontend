<template lang="pug">
div(style="position: relative;")
    .cover(:class="{'hidden': !show}", @mouseleave="showCover(false)")
        font-awesome-icon.icon(icon="camera", @click="uploadImage()")
    img.avatar(:src="src", @mouseenter="showCover(true)")
</template>

<script>
export default {
    name: 'AvatarSelector',
    props: {
        src: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            show: false
        };
    },
    methods: {
        showCover: function (show) {
            this.show = show;
        },
        uploadImage: async function () {
            const { value: url } = await this.$swal.fire({
                input: 'url',
                inputLabel: 'URL address',
                inputValue: this.src,
                inputPlaceholder: 'Enter the URL'
            });
            this.$emit('update:src', url);
        }
    }
};
</script>

<style scoped>
.hidden {
    visibility: hidden;
}

.avatar {
    border-radius: 50%;
    width: 100%;
    height: 100%;
}

.cover {
    background-color: rgba(0.5, 0.5, 0.5, 0.5);
    border-radius: 50%;
    width: 100%;
    height: 100%;
    position: absolute;
    text-align: center;
    color: #ffffff;
}

.icon {
    height: 100%;
    width: 30%;
}
</style>
