import { useSelector } from "react-redux";
import { User, Mail, Calendar, Shield } from "lucide-react";

const Profile = () => {
  const { admin } = useSelector((store) => store.user);

  if (!admin) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-text-gray">No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold text-heading mb-8">
        Profile
      </h1>

      <div className="bg-white rounded-3xl shadow-sm border border-border-light p-8">

        {/* Header */}
        <div className="flex items-center gap-6">

          <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
            {admin.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-heading">
              {admin.name}
            </h2>

            <p className="text-text-gray">
              Super Admin
            </p>
          </div>

        </div>

        {/* Details */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          <div className="flex items-center gap-4 p-5 rounded-2xl border border-border-light">

            <User className="text-primary" />

            <div>
              <p className="text-sm text-text-gray">
                Full Name
              </p>

              <p className="font-semibold text-heading">
                {admin.name}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl border border-border-light">

            <Mail className="text-primary" />

            <div>
              <p className="text-sm text-text-gray">
                Email
              </p>

              <p className="font-semibold text-heading">
                {admin.email}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl border border-border-light">

            <Shield className="text-primary" />

            <div>
              <p className="text-sm text-text-gray">
                Role
              </p>

              <p className="font-semibold text-heading">
                Super Admin
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl border border-border-light">

            <Calendar className="text-primary" />

            <div>
              <p className="text-sm text-text-gray">
                Last Login
              </p>

              <p className="font-semibold text-heading">
                {admin.lastLogin
                  ? new Date(admin.lastLogin).toLocaleString()
                  : "N/A"}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;