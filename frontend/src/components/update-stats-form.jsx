"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import axios from "axios"

export function UpdateStatsForm({ player, onSuccess ,setTrigger }) {
  const [formData, setFormData] = useState({
    totalRuns: player.totalRuns,
    ballsFaced: player.ballsFaced,
    inningsPlayed: player.inningsPlayed,
    wickets: player.wickets,
    oversBowled: player.oversBowled,
    runsConceded: player.runsConceded,
  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "value"
          ? Number.parseFloat(value)
          : Number.parseInt(value, 10),
    }));
  };

  const handleSubmit =  async(e) => {
    e.preventDefault();
    const newPlayer  = {name :player.name , category:player.category , university:player.university , totalRuns:formData.totalRuns , ballsFaced:formData.ballsFaced , inningsPlayed:formData.inningsPlayed , wickets:formData.wickets , oversBowled:formData.oversBowled , runsConceded:formData.runsConceded }
    console.log("new Player" , newPlayer)
    try{
      const res = await  axios.put(`http://localhost:3000/api/player/${player._id}` , newPlayer)
      console.log("Updated player stats", res.data);
      setTrigger( pre => !pre)
      alert("Player stats updated successfully!")


    }catch(err){
      console.log("Error in updating player stats", err);
    }
  
    // console.log("Updating player stats:", formData);

    // Simulate success and close the dialog
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="totalRuns">Total Runs</Label>
            <Input
              id="totalRuns"
              name="totalRuns"
              type="number"
              min="0"
              value={formData.totalRuns}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ballsFaced">Balls Faced</Label>
            <Input
              id="ballsFaced"
              name="ballsFaced"
              type="number"
              min="0"
              value={formData.ballsFaced}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="inningsPlayed">Innings Played</Label>
            <Input
              id="inningsPlayed"
              name="inningsPlayed"
              type="number"
              min="0"
              value={formData.inningsPlayed}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wickets">Wickets</Label>
            <Input
              id="wickets"
              name="wickets"
              type="number"
              min="0"
              value={formData.wickets}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="oversBowled">Overs Bowled</Label>
            <Input
              id="oversBowled"
              name="oversBowled"
              type="number"
              min="0"
              step="0.1"
              value={formData.oversBowled}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="runsConceded">Runs Conceded</Label>
            <Input
              id="runsConceded"
              name="runsConceded"
              type="number"
              min="0"
              value={formData.runsConceded}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="value">Player Value (in millions)</Label>
          <Input
            id="value"
            name="value"
            type="number"
            min="0"
            step="0.1"
            value={formData.value}
            onChange={handleChange}
          />
        </div> */}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onSuccess()}>
          Cancel
        </Button>
        <Button type="submit">Update Stats</Button>
      </DialogFooter>
    </form>
  );
}
