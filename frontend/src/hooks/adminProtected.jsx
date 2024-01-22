// import { redirect } from "next/navigation";
// import { useSelector } from "react-redux";

// export default function AdminProtected({ children }) {
//   const { user } = useSelector((state) => state.auth);

//   if (user) {
//     console.log('admin protected =>', user)
//     const isAdmin = user?.role === "admin";
//     return isAdmin ? children : redirect("/");
//   }
// }


import { useRouter } from 'next/router';
import { useSelector } from "react-redux";

export default function AdminProtected({ children }) {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  if (user) {
    console.log('admin protected =>', user);
    const isAdmin = user?.role === "admin";

    if (!isAdmin) {
      router.push('/');
      return null;
    }

    return children;
  } else {
    // Handle the case when the user is not logged in
    // Redirect to home or login page
    router.push('/');
    return null;
  }
}
