import React, { useState, useEffect } from "react";
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";
import Typography from "../atoms/Typography";
import Modal from "../Molecule/Modal";

const ProjectModal = ({ isOpen, onClose, onSave, loading, project }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [relatedCourse, setRelatedCourse] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setRelatedCourse(project.related_course);
    } else {
      setName("");
      setDescription("");
      setRelatedCourse("");
    }
  }, [project]);

  useEffect(() => {
    if (!project) {
      setName("");
      setDescription("");
      setRelatedCourse("");
    }
  }, [isOpen]);

  const handleSave = async () => {
    console.log("Form data being sent:", {
      name,
      description,
      related_course: relatedCourse,
    }); // Add this line for logging
    await onSave({ name, description, related_course: relatedCourse });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project?.name ? "Edit Project" : "Add Project"}
    >
      <div className="space-y-4">
        <div>
          <Typography variant="h5" className="text-gray-700 mb-2">
            Name
          </Typography>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <Typography variant="h5" className="text-gray-700 mb-2">
            Description
          </Typography>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <Typography variant="h5" className="text-gray-700 mb-2">
            Related Course
          </Typography>
          <input
            type="text"
            value={relatedCourse}
            onChange={(e) => setRelatedCourse(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <SecondaryButton onClick={onClose} color="gray">
          Cancel
        </SecondaryButton>
        <PrimaryButton onClick={handleSave} loading={loading}>
          Save
        </PrimaryButton>
      </div>
    </Modal>
  );
};

export default ProjectModal;
