import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [userType, setUserType] = useState("candidat");
  const [formData, setFormData] = useState({
    email: "",
    motdepass: "",
    telephone: "",
    adresse: "",
    imageProfil: null,
    TwoFactorEnable: false,
    // Candidat fields
    dateNaissance: "",
    competences: "",
    experience: "",
    formation: "",
    disponible: true,
    salaireAttendu: "",
    langues: [],
    profileURL: "",
    // Entreprise fields
    secteurActivite: "",
    tailleEntreprise: "",
    description: "",
    sitwebURL: "",
  });
  const [CV, setCV] = useState(null);
  const [lettreMotivation, setLettreMotivation] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.name === "CV") {
      setCV(e.target.files[0]);
    } else if (e.target.name === "lettreMotivation") {
      setLettreMotivation(e.target.files[0]);
    } else if (e.target.name === "imageProfil") {
      setFormData((prev) => ({ ...prev, imageProfil: e.target.files[0] }));
    }
  };

  const handleLanguageChange = (e) => {
    const { checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      langues: checked
        ? [...prev.langues, value]
        : prev.langues.filter((l) => l !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formDataToSend = new FormData();

      // Add common fields
      formDataToSend.append("email", formData.email);
      formDataToSend.append("motdepass", formData.motdepass);
      formDataToSend.append("telephone", formData.telephone);
      formDataToSend.append("adresse", formData.adresse);
      formDataToSend.append("TwoFactorEnable", formData.TwoFactorEnable);

      // Add profile image if selected
      if (formData.imageProfil) {
        formDataToSend.append("imageProfil", formData.imageProfil);
      }

      if (userType === "candidat") {
        // Add candidat fields
        formDataToSend.append("dateNaissance", formData.dateNaissance);
        formDataToSend.append("competences", formData.competences);
        formDataToSend.append("experience", formData.experience);
        formDataToSend.append("formation", formData.formation);
        formDataToSend.append("disponible", formData.disponible);
        formDataToSend.append("salaireAttendu", formData.salaireAttendu);
        formDataToSend.append("langues", formData.langues.join(", "));
        formDataToSend.append("profileURL", formData.profileURL);

        if (CV) formDataToSend.append("CV", CV);
        if (lettreMotivation) {
          formDataToSend.append("lettreMotivation", lettreMotivation);
        }
      } else {
        // Add entreprise fields
        formDataToSend.append("secteurActivite", formData.secteurActivite);
        formDataToSend.append("tailleEntreprise", formData.tailleEntreprise);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("sitwebURL", formData.sitwebURL);
      }

      const response = await fetch(
        `http://localhost:5000/api/signup/${userType}`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

      <div className="flex mb-6 border rounded-md overflow-hidden">
        <button
          className={`flex-1 py-2 px-4 ${
            userType === "candidat" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setUserType("candidat")}
        >
          Candidat
        </button>
        <button
          className={`flex-1 py-2 px-4 ${
            userType === "entreprise" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setUserType("entreprise")}
        >
          Entreprise
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Registration successful! Redirecting to login...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password:
          </label>
          <input
            type="password"
            name="motdepass"
            value={formData.motdepass}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone:
          </label>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address:
          </label>
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image:
          </label>
          <input
            type="file"
            name="imageProfil"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="TwoFactorEnable"
            checked={formData.TwoFactorEnable}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Enable Two-Factor Authentication
          </label>
        </div>

        {userType === "candidat" ? (
          <>
            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">
              Candidat Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth:
              </label>
              <input
                type="date"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills:
              </label>
              <textarea
                name="competences"
                value={formData.competences}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience:
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education:
              </label>
              <textarea
                name="formation"
                value={formData.formation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CV:
              </label>
              <input
                type="file"
                name="CV"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Motivation Letter:
              </label>
              <input
                type="file"
                name="lettreMotivation"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="disponible"
                checked={formData.disponible}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Available for work
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Salary:
              </label>
              <input
                type="number"
                name="salaireAttendu"
                value={formData.salaireAttendu}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Languages:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "English",
                  "French",
                  "Spanish",
                  "German",
                  "Arabic",
                  "Chinese",
                ].map((lang) => (
                  <div key={lang} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`lang-${lang}`}
                      name="langues"
                      value={lang}
                      checked={formData.langues.includes(lang)}
                      onChange={handleLanguageChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`lang-${lang}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {lang}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile URL:
              </label>
              <input
                type="url"
                name="profileURL"
                value={formData.profileURL}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">
              Entreprise Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sector:
              </label>
              <input
                type="text"
                name="secteurActivite"
                value={formData.secteurActivite}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Size:
              </label>
              <select
                name="tailleEntreprise"
                value={formData.tailleEntreprise}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select size</option>
                <option value="Small (1-50)">Small (1-50)</option>
                <option value="Medium (51-200)">Medium (51-200)</option>
                <option value="Large (201-1000)">Large (201-1000)</option>
                <option value="Enterprise (1000+)">Enterprise (1000+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website URL:
              </label>
              <input
                type="url"
                name="sitwebURL"
                value={formData.sitwebURL}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Login
        </Link>
      </p>
      <div className="mt-4 text-center">
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Signup;
