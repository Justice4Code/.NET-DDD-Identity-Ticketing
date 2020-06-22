var MegaYadakModal = function () {
    var Megayadak = this;
    this.Modal = function (selector, url, width, height, isReloaded) {
        $(selector).iziModal({
            transitionIn: 'comingIn',
            transitionOut: 'comingOut',
            transitionInOverlay: 'fadeIn',
            transitionOutOverlay: 'fadeOut',
            iframe: true,
            iframeHeight: height,
            iframeURL: url,
            width: width,
            onClosed: function () {
                if (isReloaded) {
                    window.location.reload();
                }
                $(selector).iziModal('destroy');
                //trigger
                $(document).trigger('change');
            }
        });
        $(selector).iziModal('open');
    }
    this.CloseModal = function (selector) {
        window.parent.$(selector).iziModal('close', { transition: 'bounceOutDown' });
    }
};

MegaYadakModal.inst = new MegaYadakModal();