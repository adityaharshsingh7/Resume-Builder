
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface GroceryItem {
  id: number;
  name: string;
  completed: boolean;
}

const GroceryList: React.FC = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([
    { id: 1, name: "Milk", completed: false },
    { id: 2, name: "Bread", completed: true },
    { id: 3, name: "Eggs", completed: false },
  ]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() === "") return;
    
    const newGroceryItem: GroceryItem = {
      id: Date.now(),
      name: newItem.trim(),
      completed: false,
    };
    
    setGroceryItems([...groceryItems, newGroceryItem]);
    setNewItem("");
  };

  const toggleItemCompletion = (id: number) => {
    setGroceryItems(
      groceryItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setGroceryItems(groceryItems.filter((item) => item.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Grocery List</h1>
        
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>My Shopping List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <Input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Add grocery item..."
                  className="flex-1"
                />
                <Button onClick={addItem} size="sm">
                  <Plus className="mr-1" size={16} />
                  Add
                </Button>
              </div>
              
              <div className="space-y-3">
                {groceryItems.length === 0 ? (
                  <p className="text-center text-gray-500">Your list is empty</p>
                ) : (
                  groceryItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id={`item-${item.id}`} 
                          checked={item.completed}
                          onCheckedChange={() => toggleItemCompletion(item.id)}
                        />
                        <Label
                          htmlFor={`item-${item.id}`}
                          className={`cursor-pointer ${
                            item.completed ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {item.name}
                        </Label>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => deleteItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))
                )}
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                {groceryItems.filter(item => item.completed).length} of {groceryItems.length} items completed
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GroceryList;
