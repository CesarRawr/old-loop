import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./AlertDialog.css";
import "animate.css";

const AlertDialog = withReactContent(
  Swal.mixin({
    customClass: {
      htmlContainer: "scrollbar",
    },
  })
);

export default AlertDialog;
