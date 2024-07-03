import { Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const TransactionError = () => {
   const navigate = useNavigate();
   return (
      <div>
         <h2 className="text-center">
            Your transaction is Failed, Please Try again
         </h2>
         <div className="d-flex justify-content-center mt-5">
            <Button
               variant="outline-secondary"
               className="mb-4 d-flex align-items-center"
               onClick={() => {
                  navigate("/");
               }}
            >
               <ArrowLeft className="me-3" />
               Back to Home
            </Button>
         </div>
      </div>
   );
};

export default TransactionError;
