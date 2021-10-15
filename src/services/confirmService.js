import Swal from "sweetalert2";

const confirmService = {
  remove(handler) {
    const newSwal = Swal.mixin({
      customClass: {
        confirmButton: "button button-success",
        cancelButton: "button button-error",
      },
      buttonsStyling: false,
    });

    newSwal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.value) {
          try {
            await handler();
            newSwal.fire("Deleted!", "Data has been deleted.", "success");
          } catch (e) {
            console.log(e);
            newSwal.fire("Error!", "Cannot delete.", "error");
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          newSwal.fire("Cancelled", "Your data is safe :)", "error");
        }
      });
  },
};

export default confirmService;
