import React, { useState, useEffect } from 'react';
import { Plus, Search, Activity, Calendar, Target, TrendingUp, User, Settings, LogOut, Menu, X, Dumbbell, Timer, Flame, Utensils } from 'lucide-react';
import Completeprofile from '../components/completeprofile'
import Swal from 'sweetalert2'
function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [completeprofile, setcompleteprofile] = useState(false);
  let count = 0;

  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [weight, setweight] = useState('');
  const [calorieintake, setcalorieintake] = useState('');
  const [calorieburn, setcalorieburn] = useState('');
  const [height, setheight] = useState('');
  const [waterintake, setwaterintake] = useState('');

  const [query, setquery] = useState('');
  const [cuisine,setcuisine] = useState('');
  const [minProtein, setminProtein] = useState('');
  const [maxProtein, setmaxProtein] = useState('');
  const [numberrec, setnumberrec] = useState('');
  const [minCalories, setminCalories] = useState('');
  const [maxCalories, setmaxCalories] = useState('');

  
  const [user, setUser] = useState({
    username: 'developer',
    email: 'dev@gmail.com'
  });
  
  const [workouts, setWorkouts] = useState([
    // Sample data for demonstration
  ]);

  const [newWorkout, setNewWorkout] = useState({
    name: '',
    type: 'Cardio',
    duration: '',
    calories: '',
    exercises: []
  });

  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
    duration: '',
    calories: ''
  });

  // Day order for sorting
  const dayOrder = {
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,
    'Sunday': 7
  };

  const recipesubmit = async ()=>{
    const payload = {
      query: query,
      cuisine:cuisine,
      minProtein: minProtein,
      maxProtein: maxProtein,
      numberrec: numberrec,
      minCalories: minCalories,
      maxCalories: maxCalories,
    }
    const response = await fetch('http://localhost:5000/api/recipe', {
      method: 'POST',
      credentials: 'include',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    })
    const result = await response.json();
    if(result.success){
      console.log(result.data);
    }
  }

  // Function to sort workouts by day
  const getSortedWorkouts = () => {
    return [...workouts].sort((a, b) => {
      const dayA = dayOrder[a.day] || 8;
      const dayB = dayOrder[b.day] || 8;
      return dayA - dayB;
    });
  };

  const loaduserdata = async ()=>{
    const response = await fetch('http://localhost:5000/api/load', {
      method: 'GET',
      credentials: 'include',
      
    })
    const result = await response.json();
    if(result.success){
        const User = result.user;
        setweight(User.weight);
        setheight(User.height);
        setcalorieintake(User. calorieintakeperday);
        setcalorieburn(User.calorieburnperday)
        setwaterintake(User.waterintakeperday);


        if (
  !User.weight ||
  !User.height ||
  !User.calorieintakeperday ||
  !User.calorieburnperday ||
  !User.waterintakeperday
) {
  Swal.fire({
    icon: 'warning',
    title: 'Incomplete Profile',
    text: 'Please complete your profile to get accurate tracking!',
    confirmButtonText: 'Go to Profile',
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      setActiveSection('profile'); // or any logic to show profile section
    }
  });
}

      }
  }

  const loadworkouts = async()=>{
    const response = await fetch('http://localhost:5000/api/workout', {
      method: 'GET',
      credentials: 'include'
    })
    const result = await response.json();
    if(result.success){
      const workoutsArray = Array.isArray(result.workouts) ? result.workouts : [result.workouts];

      const workouts = workoutsArray.map(w => ({
        id: w._id,
        name: w.workoutname,
        type: w.Type,
        duration: w.duration,
        calories: w.calories,
        exercises: w.exercises,
        day: w.day,
        date: new Date(w.date).toISOString().split('T')[0],
    }));

      setWorkouts(prev => {
        const existingIds = new Set(prev.map(w => w.id));
        const newOnes = workouts.filter(w => !existingIds.has(w.id));
        return [...newOnes, ...prev];
      });
    }
  }

  // Simulate loading and auth check
  useEffect(() => {
    count = count+1
    const checkAuth = async () => {
      count = count+1
      const response = await fetch('http://localhost:5000/api/dashboard', {
        method: 'GET',
        credentials: 'include'
      })
      const result = await response.json();
      if(!result.success){
        setLoading(true)
        window.location.href = '/login';
      }
      else{
        setLoading(false);
        setUser({
           username: result.user.username,
           email: result.user.email,
        })
                
        
      }
    };

    
    loadworkouts();
    loaduserdata();
    checkAuth();
  }, []);

  const handleLogout = async () => {
    // Logout logic here
    const response = await fetch('http://localhost:5000/api/logout', {
      method: 'GET',
      credentials: 'include',
    })
    const result = await response.json();
    if(result.success){
      alert('Logged out successfully');
      window.location.href = result.redirect;
    }
  };

  const addExerciseToWorkout = () => {
    if (newExercise.name) {
      setNewWorkout(prev => ({
        ...prev,
        exercises: [...prev.exercises, { ...newExercise, id: Date.now() }]
      }));
      setNewExercise({
        name: '',
        sets: '',
        reps: '',
        weight: '',
        duration: '',
        calories: ''
      });
    }
  };

  const saveWorkout = async () => {
    if (newWorkout.name && newWorkout.duration) {
      const workout = {
        ...newWorkout,
        date: new Date().toISOString().split('T')[0], 
        day:new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      };
      setNewWorkout({
        name: '',
        type: 'Cardio',
        duration: '',
        calories: '',
        exercises: []
      });
      const response = await fetch('http://localhost:5000/api/workout', {
         method: 'POST', 
         credentials: 'include',
         headers: {
                'Content-Type': 'application/json'
         },
         body: JSON.stringify(workout),
      })
      const result = await response.json();
      if(result.success){
         const savedWorkout = {
          id: result.workout._id,
          name: result.workout.workoutname,
          type: result.workout.Type,
          duration: result.workout.duration,
          calories: result.workout.calories,
          exercises: result.workout.exercises,
          day: result.workout.day,
          date: new Date(result.workout.date).toISOString().split('T')[0],
        };

        setWorkouts(prev => [savedWorkout, ...prev]);
        alert('Workout saved successfully!');
      }
      setShowWorkoutForm(false);
    }
  };

  const removeExercise = (index) => {
    setNewWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const totalWorkouts = workouts.length;
  const totalCalories = workouts.reduce((sum, w) => sum + parseInt(w.calories || 0), 0);
  const totalDuration = workouts.reduce((sum, w) => sum + parseInt(w.duration || 0), 0);
  const avgDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0 bg-white shadow-lg`}>
        <div className="h-full px-4 py-6 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center mb-8 px-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-800">FitTracker</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <button
              onClick={() => {setActiveSection('dashboard'); setSidebarOpen(false);}}
              className={`cursor-pointer w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeSection === 'dashboard' 
                  ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <TrendingUp size={18} />
              <span className="ml-3">Dashboard</span>
            </button>

            <button
              onClick={() => {setActiveSection('fitness'); setSidebarOpen(false);}}
              className={`w-full cursor-pointer flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeSection === 'fitness' 
                  ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Dumbbell size={18} />
              <span className="ml-3">Fitness Tracker</span>
              <span className="ml-auto bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">Pro</span>
            </button>

            <button
              onClick={() => {setActiveSection('inbox'); setSidebarOpen(false);}}
              className={`w-full cursor-pointer flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeSection === 'inbox' 
                  ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Calendar size={18} />
              <span className="ml-3">Schedule</span>
            </button>
            <button
              onClick={() => {setActiveSection('meal'); setSidebarOpen(false);}}
              className={`w-full cursor-pointer flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeSection === 'meal' 
                  ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Utensils size={18} />
              <span className="ml-3">Meal Plan Generator</span>
            </button>
          </nav>

          {/* User Profile */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-full cursor-pointer flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="ml-3 flex-1 text-left">{user.username}</span>
                <Settings size={16} className="text-gray-400" />
              </button>

              {profileOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-full bg-white border rounded-lg shadow-lg z-10">
                  <div className="p-3 text-xs text-gray-600 border-b">
                    {user.email}
                  </div>

                  <button
                    onClick={()=>{
                      setcompleteprofile(prev => !prev);
                      setActiveSection('profile');
                    }}
                    className="w-full cursor-pointer flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-teal-700 hover:text-white"
                  >
                    <LogOut size={16} />
                    <span className="ml-2">profile</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full cursor-pointer flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    <span className="ml-2">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="sm:ml-64 p-6">
        {activeSection === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <Dumbbell className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Workouts</p>
                    <p className="text-2xl font-bold text-gray-900">{totalWorkouts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-teal-100 rounded-lg">
                    <Flame className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Calories Burned</p>
                    <p className="text-2xl font-bold text-gray-900">{totalCalories}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <Timer className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                    <p className="text-2xl font-bold text-gray-900">{avgDuration}m</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Workouts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Recent Workouts</h2>
              </div>
              <div className="p-6">
                {getSortedWorkouts().slice(0, 3).map((workout, index) => (
                  <div key={workout.id} className={`flex items-center justify-between ${index !== 2 ? 'pb-4 mb-4 border-b border-gray-100' : ''}`}>
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        workout.type === 'Cardio' ? 'bg-emerald-100' : 'bg-teal-100'
                      }`}>
                        <Activity className={`w-5 h-5 ${
                          workout.type === 'Cardio' ? 'text-emerald-600' : 'text-teal-600'
                        }`} />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{workout.name}</p>
                        <p className="text-sm text-gray-600">{workout.type} • {workout.duration}min • {workout.day}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{workout.calories} cal</p>
                      <p className="text-sm text-gray-600">{workout.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

                      <div className="relative top-10">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-emerald-100 rounded-full opacity-60"></div>
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-teal-100 rounded-full opacity-40"></div>
                        <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-semibold text-gray-900">Today's Progress</h3>
                              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                <TrendingUp className="h-4 w-4 text-emerald-600" />
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Calorie Intake</span>
                                  <span className="font-medium text-gray-900"></span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full w-4/5"></div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Calories Burnt</span>
                                  <span className="font-medium text-gray-900">{totalCalories} / {calorieburn}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full w-3/4" style={{ width: `${Math.min((totalCalories / calorieburn) * 100, 100)}%` }}></div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Water Intake</span>
                                  <span className="font-medium text-gray-900"></span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full w-3/4"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
          </div>
        )}

        {activeSection === 'fitness' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Fitness Tracker</h1>
              <button
                onClick={() => setShowWorkoutForm(true)}
                className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                <Plus size={20} />
                <span className="ml-2">Add Workout</span>
              </button>
            </div>

            {/* Workout Form Modal */}
            {showWorkoutForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-900">Add New Workout</h2>
                      <button
                        onClick={() => setShowWorkoutForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Workout Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Workout Name</label>
                        <input
                          type="text"
                          value={newWorkout.name}
                          onChange={(e) => setNewWorkout(prev => ({...prev, name: e.target.value}))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="e.g., Morning Cardio"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <select
                          value={newWorkout.type}
                          onChange={(e) => setNewWorkout(prev => ({...prev, type: e.target.value}))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="Cardio">Cardio</option>
                          <option value="Strength">Strength</option>
                          <option value="Flexibility">Flexibility</option>
                          <option value="Sports">Sports</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                        <input
                          type="number"
                          value={newWorkout.duration}
                          onChange={(e) => setNewWorkout(prev => ({...prev, duration: e.target.value}))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Calories</label>
                        <input
                          type="number"
                          value={newWorkout.calories}
                          onChange={(e) => setNewWorkout(prev => ({...prev, calories: e.target.value}))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="250"
                        />
                      </div>
                    </div>

                    {/* Exercises Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercises</h3>
                      
                      {/* Add Exercise Form */}
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                          <input
                            type="text"
                            value={newExercise.name}
                            onChange={(e) => setNewExercise(prev => ({...prev, name: e.target.value}))}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Exercise name"
                          />
                          {newWorkout.type === 'Strength' ? (
                            <>
                              <input
                                type="number"
                                value={newExercise.sets}
                                onChange={(e) => setNewExercise(prev => ({...prev, sets: e.target.value}))}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Sets"
                              />
                              <input
                                type="number"
                                value={newExercise.reps}
                                onChange={(e) => setNewExercise(prev => ({...prev, reps: e.target.value}))}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Reps"
                              />
                              <input
                                type="number"
                                value={newExercise.weight}
                                onChange={(e) => setNewExercise(prev => ({...prev, weight: e.target.value}))}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Weight (kg)"
                              />
                            </>
                          ) : (
                            <>
                              <input
                                type="number"
                                value={newExercise.duration}
                                onChange={(e) => setNewExercise(prev => ({...prev, duration: e.target.value}))}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Duration (min)"
                              />
                              <input
                                type="number"
                                value={newExercise.calories}
                                onChange={(e) => setNewExercise(prev => ({...prev, calories: e.target.value}))}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Calories"
                              />
                            </>
                          )}
                        </div>
                        <button
                          onClick={addExerciseToWorkout}
                          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                        >
                          Add Exercise
                        </button>
                      </div>

                      {/* Exercise List */}
                      {newWorkout.exercises.length > 0 && (
                        <div className="space-y-2">
                          {newWorkout.exercises.map((exercise, index) => (
                            <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                              <div>
                                <span className="font-medium">{exercise.name}</span>
                                {exercise.sets ? (
                                  <span className="text-gray-600 ml-2">
                                    {exercise.sets} sets × {exercise.reps} reps @ {exercise.weight}kg
                                  </span>
                                ) : (
                                  <span className="text-gray-600 ml-2">
                                    {exercise.duration}min • {exercise.calories} cal
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => removeExercise(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => setShowWorkoutForm(false)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveWorkout}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                      >
                        Save Workout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Workouts List - Now sorted by day */}
            <div className="space-y-4">
              {getSortedWorkouts().map((workout) => (
                <div key={workout.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
                      <p className="text-gray-600">{workout.type} • {workout.date} • {workout.day}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-600">{workout.calories} cal</p>
                      <p className="text-gray-600">{workout.duration} minutes</p>
                    </div>
                  </div>
                  
                  {workout.exercises.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Exercises:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {workout.exercises.map((exercise, index) => (
                          <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            <span className="font-medium">{exercise.name}</span>
                            {exercise.sets ? (
                              <span className="ml-2">
                                {exercise.sets}×{exercise.reps} @ {exercise.weight}kg
                              </span>
                            ) : (
                              <span className="ml-2">
                                {exercise.duration}min • {exercise.calories}cal
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'inbox' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Schedule</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Schedule feature coming soon...</p>
            </div>
          </div>
        )}

        {activeSection === 'profile' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <div>
              <Completeprofile/>
            </div>
          </div>
        )}

        {activeSection === 'meal' && (
           <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Meal Planner</h1>
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Plan Your Perfect Meals</h2>
          <p className="text-gray-600">Tell us your preferences and we'll find the perfect recipes for you</p>
        </div>
        
        <div className="space-y-6">
          {/* Food Type */}
          <div>
            <label htmlFor="food" className="block text-sm font-medium text-gray-700 mb-2">
              What food would you like to eat?
            </label>
            <input
              type="text"
              id="food"
              name="food"
              value = {query}
              onChange = {(e)=>{
                setquery(e.target.value);
              }}
              placeholder="e.g., chicken, pasta, salad, salmon..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Cuisine */}
          <div>
            <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Cuisine
            </label>
            <input
              type="text"
              id="food"
              name="food"
              value = {cuisine}
              onChange = {(e)=>{
                setcuisine(e.target.value);
              }}
              placeholder="e.g., chicken, pasta, salad, salmon..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Protein Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="minProtein" className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Protein (g)
              </label>
              <input
                type="number"
                id="minProtein"
                name="minProtein"
                value = {minProtein}
                onChange = {(e)=>{
                  setminProtein(e.target.value);
                }}
                min="0"
                placeholder="e.g., 20"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="maxProtein" className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Protein (g)
              </label>
              <input
                type="number"
                id="maxProtein"
                name="maxProtein"
                value = {maxProtein}
                onChange = {(e)=>{
                  setmaxProtein(e.target.value);
                }}
                min="0"
                placeholder="e.g., 50"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Calories Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="minCalories" className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Calories
              </label>
              <input
                type="number"
                id="minCalories"
                name="minCalories"
                value = {minCalories}
                onChange = {(e)=>{
                  setminCalories(e.target.value);
                }}
                min="0"
                placeholder="e.g., 300"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="maxCalories" className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Calories
              </label>
              <input
                type="number"
                id="maxCalories"
                name="maxCalories"
                value = {maxCalories}
                onChange = {(e)=>{
                  setmaxCalories(e.target.value);
                }}
                min="0"
                placeholder="e.g., 800"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Number of Recipes */}
          <div>
            <label htmlFor="numberOfRecipes" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Recipes
            </label>
            <select
              id="numberOfRecipes"
              name="numberOfRecipes"
              value = {numberrec}
                onChange = {(e)=>{
                  setnumberrec(e.target.value);
                }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="1">1 Recipe</option>
              <option value="3">3 Recipes</option>
              <option value="5">5 Recipes</option>
              <option value="10">10 Recipes</option>
              <option value="15">15 Recipes</option>
              <option value="20">20 Recipes</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick = {recipesubmit}
            className="cursor-pointer w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Find My Recipes
          </button>
        </div>
      </div>
    </div>
        )}
      </main>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;