import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { motion } from "framer-motion";
import HomeButton from "../../components/HomeButton";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Here you can add code to connect to API and send login data
      // Example: await api.login(email, password);

      // Simulate response delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to home page after successful login
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2081] to-[#2a3091] flex justify-center items-center p-4">
      <HomeButton />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 bg-white rounded-full" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">Claro </h1>
        </div>
        <Card className="w-full max-w-md shadow-xl bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">Login</CardTitle>
            <CardDescription className="text-white/80">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-400/20 text-red-100 p-3 rounded-md text-sm border border-red-400/30">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/90 leading-none">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-white/90 leading-none">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-blue-300 hover:text-blue-200">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#5865f2] hover:bg-[#4752c4]"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-white/70">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-300 hover:text-blue-200 font-medium">
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>
        <div className="mt-8 text-center">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}