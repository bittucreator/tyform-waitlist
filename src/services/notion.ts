interface WaitlistEntry {
  name: string;
  email: string;
}

export const addToWaitlist = async ({ name, email }: WaitlistEntry): Promise<boolean> => {
  try {
    // Get Supabase URL from environment variables
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase credentials not configured');
    }

    // Call the Supabase Edge Function
    const response = await fetch(`${supabaseUrl}/functions/v1/add-to-waitlist`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Edge function failed:', errorData);
      throw new Error(errorData.details || 'Failed to add to waitlist');
    }

    const data = await response.json();
    console.log('Successfully added to waitlist:', data.id);
    
    // Store in local storage for position tracking
    storeInLocalStorage(name, email, data.id);
    
    return true;

  } catch (error) {
    console.error("Error adding to Notion waitlist:", error);
    throw error;
  }
};

export const getWaitlistPosition = (): number => {
  try {
    // Get the current waitlist from local storage
    const waitlistData = JSON.parse(localStorage.getItem('waitlist') || '[]');
    
    // Return the current position (length of waitlist)
    return waitlistData.length;
  } catch (error) {
    console.error('Error getting waitlist position:', error);
    // Return a random position between 1000-5000 as fallback
    return Math.floor(Math.random() * 4000) + 1000;
  }
};

// Helper function to store in local storage for position tracking
const storeInLocalStorage = (name: string, email: string, notionId: string): void => {
  try {
    const waitlistData = JSON.parse(localStorage.getItem('waitlist') || '[]');
    const newEntry = {
      id: notionId,
      name,
      email,
      timestamp: new Date().toISOString(),
    };
    waitlistData.push(newEntry);
    localStorage.setItem('waitlist', JSON.stringify(waitlistData));
    console.log('Stored in local storage for position tracking:', newEntry);
  } catch (error) {
    console.error('Failed to store in local storage:', error);
  }
};