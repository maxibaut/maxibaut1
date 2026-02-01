-- Drop the existing overly permissive public read policy
DROP POLICY IF EXISTS "Site settings are publicly readable" ON public.site_settings;
DROP POLICY IF EXISTS "Allow public read access" ON public.site_settings;

-- Create a more restrictive policy: only authenticated users can read
CREATE POLICY "Authenticated users can read site settings"
ON public.site_settings
FOR SELECT
TO authenticated
USING (true);