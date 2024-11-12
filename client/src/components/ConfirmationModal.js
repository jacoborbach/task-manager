import React from "react";

// Confirmation modal design using Bootsrap - Helped Generate this using AI
function ConfirmationModal({ setShowModal, taskToDelete, deleteTask }) {

    return (
        <div className="modal fade show" tabIndex="-1" style={{
            display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Confirm Deletion</h5>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                        <p>Are you sure you want to delete this task? This action cannot be undone.</p>
                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => deleteTask(taskToDelete)}>
                            Yes, delete it
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ConfirmationModal;