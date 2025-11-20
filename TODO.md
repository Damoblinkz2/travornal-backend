# TODO: Fix MongoDB Connection and Add Logging

## Steps to Complete

1. **Fix model name in cities.module.ts** ✅
   - Changed the empty name in MongooseModule.forFeature to 'Cities' to match the schema class.
   - Also corrected the import from CatSchema to CitiesSchema.

2. **Add MongoDB connection logging in main.ts** ✅
   - Imported mongoose in main.ts.
   - Added event listeners for 'connected' and 'error' to log success and errors to console.

3. **Test the application**
   - Run the development server and verify MongoDB connection logs appear in console.
