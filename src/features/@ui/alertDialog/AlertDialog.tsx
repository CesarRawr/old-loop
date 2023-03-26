import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "@sweetalert2/theme-material-ui/material-ui.min.css";
import "./AlertDialog.css";
import "animate.css";

const AlertDialog = withReactContent(Swal);
export default AlertDialog;
