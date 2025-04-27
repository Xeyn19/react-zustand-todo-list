import { create } from "zustand";
import { persist } from "zustand/middleware";

const useHabitStore = create(
  persist(
    (set,get) => ({
      habits: [],
      
      isLoading: false,
      
      error: null,
      
      totalHabits: () => get().habits.length,
      
      completedHabits: () => 
        get().habits.filter((habit) => habit.completedDates.length > 0 ).length,
      
      longestStreak: () => {
        let longest = 0;
        let habitWithNameStreak = "";
        get().habits.forEach((habit) => {
          let streak = 0;
          const currentDate = new Date();
          let tempStreak = 0;
       

          while (true) {
            const dateString = currentDate.toISOString().split("T")[0];

            if (habit.completedDates.includes(dateString)) {
              tempStreak++;
              currentDate.setDate(currentDate.getDate() - 1);
            } else {
              break;
            }
          }

          if (tempStreak > longest) {
            longest = tempStreak;
            habitWithNameStreak = habit.name;
          }
        });
        return {longest, habitWithNameStreak};
      },
      
      addHabit: (name, frequency) =>
        set((state) => ({
          habits: [
            ...state.habits,
            {
              id: Date.now().toString(),
              name,
              frequency,
              completedDates: [],
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      
        removeHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),
      
        toggleHabit: (id, date) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id
              ? {
                  ...habit,
                  completedDates: habit.completedDates.includes(date)
                    ? habit.completedDates.filter((d) => d !== date)
                    : [...habit.completedDates, date],
                }
              : habit
          ),
        })),

    }),
    {
      name: "habits-local", 
    }
  )
);

export default useHabitStore;
