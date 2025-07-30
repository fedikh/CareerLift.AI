import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function TestLogin() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = JSON.parse(atob(token.split(".")[1])).userId;

        const response = await fetch(
          `http://localhost:5000/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-8">
        Profile Information
      </h2>

      {userData && (
        <div className="space-y-8">
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">
                  {userData.telephone || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">
                  {userData.adresse || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Created</p>
                <p className="font-medium">
                  {new Date(userData.datecreation).toLocaleDateString()}
                </p>
              </div>
            </div>
            {userData.imageProfil && (
              <div className="mt-4">
                <img
                  src={userData.imageProfil}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          {userData.userType === "membre" && (
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Candidat Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">
                    {userData.dateNaissance || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Skills</p>
                  <p className="font-medium">
                    {userData.competences || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">
                    {userData.experience || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Education</p>
                  <p className="font-medium">
                    {userData.formation || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Available</p>
                  <p className="font-medium">
                    {userData.disponible ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expected Salary</p>
                  <p className="font-medium">
                    {userData.salaireAttendu || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Languages</p>
                  <p className="font-medium">
                    {userData.langues || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Profile URL</p>
                  <p className="font-medium">
                    {userData.profileURL || "Not provided"}
                  </p>
                </div>
              </div>

              {userData.files && userData.files.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Files:
                  </h4>
                  <ul className="space-y-2">
                    {userData.files.map((file) => (
                      <li key={file.id} className="flex items-center">
                        <span className="mr-2">{file.type_fichier}:</span>
                        <a
                          href={`http://localhost:5000/${file.chemin_fichier}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Download
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {userData.userType === "entreprise" && (
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Entreprise Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Sector</p>
                  <p className="font-medium">
                    {userData.secteurActivite || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company Size</p>
                  <p className="font-medium">
                    {userData.tailleEntreprise || "Not provided"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="font-medium">
                    {userData.description || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <p className="font-medium">
                    {userData.sitwebURL ? (
                      <a
                        href={userData.sitwebURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {userData.sitwebURL}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {userData.userType === "admin" && (
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Admin Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">
                    {userData.department || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Access Level</p>
                  <p className="font-medium">
                    {userData.niveauAccess || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Activity</p>
                  <p className="font-medium">
                    {userData.derniereActivite
                      ? new Date(userData.derniereActivite).toLocaleString()
                      : "Not available"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mt-4 text-center">
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default TestLogin;
